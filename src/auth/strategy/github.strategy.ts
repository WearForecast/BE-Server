import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
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
    let email = null;
    if (profile.emails && profile.emails.length > 0) {
      email = profile.emails[0].value;
    } else {
      try {
        const response = await axios.get('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        // Look for the primary verified email
        const primaryEmail = response.data.find(
          (e: any) => e.primary && e.verified,
        );
        email = primaryEmail ? primaryEmail.email : null;
      } catch (error) {
        return done(
          new UnauthorizedException('Failed to fetch email from GitHub'),
          null,
        );
      }
    }

    if (!email) {
      return done(
        new UnauthorizedException(
          'GitHub account did not return an email address.',
        ),
        null,
      );
    }

    const displayName = profile.displayName || profile.username || '';
    const [firstName, ...lastNameParts] = displayName.split(' ');
    const lastName = lastNameParts.join(' ');

    const user = {
      email,
      firstName,
      lastName,
      picture: profile.photos?.[0]?.value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
