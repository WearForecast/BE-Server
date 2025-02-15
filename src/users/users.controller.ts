import { Controller, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserBaseInfo } from 'src/auth/type/user-base-info.type';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { UpdateProfilePayload } from './payload/update-profile.payload';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // PATCH endpoint for updating user profile fields.
  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '프로필 수정',
    description: '로그인한 사용자의 프로필을 수정하는 API.',
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: UpdateProfilePayload })
  async updateProfile(
    @CurrentUser() user: UserBaseInfo,
    @Body() payload: UpdateProfilePayload,
  ) {
    return this.userService.updateProfile(user.id, payload);
  }
}
