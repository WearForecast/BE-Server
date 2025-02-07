import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
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

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  // Sign Up
  @Post('sign-up')
  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ type: TokenDto })
  async signUp(
    @Body() payload: SignUpPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    const tokens = await this.authService.signUp(payload);

    // refresh Token은 쿠키로
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      // 이후 실제 도메인으로 변경
      domain: 'localhost',
    });

    return TokenDto.from(tokens.accessToken);
  }


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
      domain: 'localhost',
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
      domain: 'localhost',
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
