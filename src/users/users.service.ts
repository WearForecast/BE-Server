import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UpdateProfilePayload } from './payload/update-profile.payload';

export type User = {
  userId: number;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(userId: number, payload: UpdateProfilePayload) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: payload,
    });

    // Exclude sensitive fields from the returned object.
    const { password, refreshToken, email, id, isEmailVerified, ...result } =
      updatedUser;
    return result;
  }
}
