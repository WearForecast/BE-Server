import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { SignUpPayload } from './payload/sign-up.payload';
import { Response, Request } from 'express';
import { LoginPayload } from './payload/login.payload';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorator/user.decorator';
import { UserBaseInfo } from './type/user-base-info.type';
import { ChangePasswordPayload } from './payload/change-password.payload';
import { GoogleAuthGuard } from './guard/google.guard';
import { GithubAuthGuard } from './guard/github.guard';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // This endpoint initiates the Google OAuth flow.
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: '구글 OAuth 인증',
    description: '프론트에서 이 API로 접근해야 함. https://wearforecast-767741558681.asia-northeast1.run.app/auth/google',
  })
  // This route will be handled by Passport and will redirect the user to Google.
  googleAuth() {}

  // This endpoint handles the callback from Google.
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: '구글 OAuth 인증 콜백',
    description: 'Google에서 리다이렉트 된 후 이 API로 접근됨.',
  })
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    // At this point, req.user contains the Google user info provided by our GoogleStrategy.
    const tokens = await this.authService.googleLogin(req.user);

    // Set the refresh token as a cookie.
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      // Replace with your actual domain in production.
      // domain: 'localhost',
    });

    return TokenDto.from(tokens.accessToken);
  }

  // Initiates the GitHub OAuth flow.
  @Get('github')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({
    summary: 'GitHub OAuth 인증',
    description: '프론트에서 이 API로 접근해야 함.',
  })
  // This route is handled by Passport and will redirect the user to GitHub.
  githubAuth() {}

  // Handles the callback from GitHub.
  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({
    summary: 'GitHub OAuth 콜백',
    description: 'GitHub에서 리다이렉트 된 후 이 API로 접근됨.',
  })
  async githubAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    // req.user will contain the GitHub user info provided by the GithubStrategy.
    const tokens = await this.authService.githubLogin(req.user);

    // Set the refresh token as a cookie (use dynamic domain settings in production).
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      // domain: 'localhost', // process.env.COOKIE_DOMAIN || 'localhost',
    });

    return TokenDto.from(tokens.accessToken);
  }

  @Post('sign-up')
  @ApiOperation({
    summary: '회원가입 요청',
    description: '이메일 링크를 보내고, 인증 후 가입을 완료함.',
  })
  async initiateSignUp(
    @Body() payload: SignUpPayload,
  ): Promise<{ message: string }> {
    return this.authService.initiateSignUp(payload);
  }

  @Get('complete-signup')
  @ApiOperation({
    summary: '가입 완료',
    description: '이메일 인증이 된 후 토큰 발급용 API',
  })
  async completeSignUp(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    const result = await this.authService.completeSignUp(token);
    // Set the refresh token as a cookie
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      // domain: 'localhost', // Adjust as needed for production
    });
    return TokenDto.from(result.tokens.accessToken);
  }

  // // Sign Up
  // @Post('sign-up')
  // @ApiOperation({ summary: '회원가입' })
  // @ApiCreatedResponse({ type: TokenDto })
  // async signUp(
  //   @Body() payload: SignUpPayload,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<TokenDto> {
  //   const tokens = await this.authService.signUp(payload);

  //   // refresh Token은 쿠키로
  //   res.cookie('refreshToken', tokens.refreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'strict',
  //     // 이후 실제 도메인으로 변경
  //     domain: 'localhost',
  //   });

  //   return TokenDto.from(tokens.accessToken);
  // }

  // Login
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: '로그인',
    description: 'admin@korea.ac.kr, admin2025',
  })
  @ApiOkResponse({ type: TokenDto })
  async login(
    @Body() payload: LoginPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    const tokens = await this.authService.login(payload);

    // refresh Token은 쿠키로
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      // 이후 실제 도메인으로 변경
      // domain: 'localhost',
    });

    return TokenDto.from(tokens.accessToken);
  }

  // Refresh Token
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: '토큰 갱신',
    description: 'access token이 만료되면 이 api로 재발급 받아야 함.',
  })
  @ApiOkResponse({ type: TokenDto })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    const tokens = await this.authService.refresh(req.cookies['refreshToken']);

    // refresh Token은 쿠키로
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      // 이후 실제 도메인으로 변경
      // domain: 'localhost',
    });

    return TokenDto.from(tokens.accessToken);
  }

  // Password Change
  @Put('password')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiNoContentResponse()
  async changePassword(
    @Body() payload: ChangePasswordPayload,
    @CurrentUser() user: UserBaseInfo,
  ): Promise<void> {
    return this.authService.changePassword(payload, user);
  }
}
