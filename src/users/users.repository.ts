import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { UpdateProfilePayload } from './payload/update-profile.payload';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserProfile(userId: number, payload: UpdateProfilePayload) {
    return this.prisma.user.update({
      where: { id: userId },
      data: payload,
    });
  }

  async getUserProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
