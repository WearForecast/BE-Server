import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
        clientID: configService.get<string>('GITHUB_CLIENT_ID'),
        clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
        callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'), 
        scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { email, username, displayName } = profile;
    const user = {
      email,
      username,
      name: displayName || username,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}