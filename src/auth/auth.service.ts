import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpPayload } from './payload/sign-up.payload';
import { BcryptPasswordService } from './bcrypt-password.service';
import { SignUpData } from './type/sign-up-data.type';
import { Tokens } from './type/tokens.type';
import { TokenService } from './token.service';
import { LoginPayload } from './payload/login.payload';
import { UserBaseInfo } from './type/user-base-info.type';
import { ChangePasswordPayload } from './payload/change-password.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: BcryptPasswordService,
    private readonly tokenService: TokenService,
  ) {}

   // New method to handle Google OAuth login
   async googleLogin(googleUser: any): Promise<Tokens> {
    const { email, firstName, lastName } = googleUser;
    if (!email) {
      throw new UnauthorizedException('Google account did not return an email address.');
    }

    // Check if the user already exists
    let user = await this.authRepository.getUserByEmail(email);
    if (!user) {
      // If not, create a new user with default values.
      // Generate a random password since it won’t be used.
      const randomPassword = Math.random().toString(36).substring(2);
      const newUserData: SignUpData = {
        name: `${firstName}`.trim() || email,
        email,
        password: await this.passwordService.getEncryptPassword(randomPassword),
        birthyear: 0, 
        region: '',     
        gender: '',     
      };
      user = await this.authRepository.createUser(newUserData);
    }

    return this.generateTokens(user.id);
  }


  // GitHub OAuth login logic.
  async githubLogin(githubUser: any): Promise<Tokens> {
    const { email, username, name } = githubUser;
    if (!email) {
      throw new UnauthorizedException('GitHub account did not return an email address.');
    }

    // Check if the user already exists.
    let user = await this.authRepository.getUserByEmail(email);
    if (!user) {
      // If not, create a new user with default values.
      // Generate a random password since it won’t be used.
      const randomPassword = Math.random().toString(36).substring(2);
      const newUserData: SignUpData = {
        name: name || username || email,
        email,
        password: await this.passwordService.getEncryptPassword(randomPassword),
        birthyear: 0,
        region: '',
        gender: '',
      };
      user = await this.authRepository.createUser(newUserData);
    }

    return this.generateTokens(user.id);
  }


  //Sign up Logic
  async signUp(payload: SignUpPayload): Promise<Tokens> {
    const user = await this.authRepository.getUserByEmail(payload.email);
    if (user) {
      throw new ConflictException('이미 사용중인 이메일입니다.');
    }

    const hashedPassword = await this.passwordService.getEncryptPassword(
      payload.password,
    );

    const inputData: SignUpData = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      birthyear: payload.birthyear,
      region: payload.region,
      gender: payload.gender,
    };

    const createdUser = await this.authRepository.createUser(inputData);

    return this.generateTokens(createdUser.id);
  }

  // Login Logic
  async login(payload: LoginPayload): Promise<Tokens> {
    const user = await this.authRepository.getUserByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }

    const isPasswordMatch = await this.passwordService.validatePassword(
      payload.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new ConflictException('ID/비밀번호가 일치하지 않습니다.');
    }

    return this.generateTokens(user.id);
  }

  // Refresh Token Logic
  async refresh(refreshToken: string): Promise<Tokens> {
    const data = this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.authRepository.getUserById(data.userId);
    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return this.generateTokens(user.id);
  }

  // Change Password Logic
  async changePassword(
    payload: ChangePasswordPayload,
    user: UserBaseInfo,
  ): Promise<void> {
    const isValid = await this.passwordService.validatePassword(
      payload.currentPassword,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('현재 비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await this.passwordService.getEncryptPassword(
      payload.newPassword,
    );

    await this.authRepository.updateUser(user.id, {
      password: hashedPassword,
    });
  }

  // Generate Tokens Logic
  private async generateTokens(userId: number): Promise<Tokens> {
    const tokens = this.tokenService.generateTokens({ userId });

    await this.authRepository.updateUser(userId, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
}
