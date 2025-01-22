import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { SignUpPayload } from './payload/sign-up.payload';
import { BcryptPasswordService } from './bcrypt-password.service';
import { SignUpData } from './type/sign-up-data.type';
import { Tokens } from './type/tokens.type';
import { TokenService } from './token.service';
import { LoginPayload } from './payload/login.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: BcryptPasswordService,
    private readonly tokenService: TokenService,
  ) {}

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
      birthday: payload.birthday,
      region: payload.region,
      gender: payload.gender,
    };

    const createdUser = await this.authRepository.createUser(inputData);

    return this.generateTokens(createdUser.id);
  }

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
      throw new ConflictException('비밀번호가 일치하지 않습니다.');
    }

    return this.generateTokens(user.id);
  }

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

  private async generateTokens(userId: number): Promise<Tokens> {
    const tokens = this.tokenService.generateTokens({ userId });

    await this.authRepository.updateUser(userId, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }
}