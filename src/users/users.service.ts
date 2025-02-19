import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateProfilePayload } from './payload/update-profile.payload';
import { UserBaseInfo } from 'src/auth/type/user-base-info.type';
import { PublicUserProfile } from './type/public-user-profile.type';

export type User = {
  userId: number;
};

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async updateProfile(userId: number, payload: UpdateProfilePayload) {
    const updatedUser = await this.usersRepository.updateUserProfile(
      userId,
      payload,
    );
    // Exclude sensitive fields
    const { password, refreshToken, email, id, isEmailVerified, ...result } =
      updatedUser;
    return result;
  }

  async getProfile(userId: number): Promise<PublicUserProfile> {
    const user = await this.usersRepository.getUserProfile(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    // Exclude sensitive fields (adjust as needed)
    const { password, refreshToken, isEmailVerified, id, ...publicprofile } =
      user;
    return publicprofile as PublicUserProfile;
  }
}
