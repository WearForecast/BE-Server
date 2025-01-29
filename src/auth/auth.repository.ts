import { PrismaService } from '../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserBaseInfo } from './type/user-base-info.type';
import { SignUpData } from './type/sign-up-data.type';
import { UpdateUserData } from './type/update-user-data.type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: SignUpData): Promise<UserBaseInfo> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        birthyear: data.birthyear,
        region: data.region,
        gender: data.gender,
      },
      select: {
        name: true,
        id: true,
        email: true,
        password: true,
        birthyear: true,
        region: true,
        gender: true,
        refreshToken: true,
      },
    });
  }

  async updateUser(id: number, data: UpdateUserData): Promise<UserBaseInfo> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        birthyear: data.birthyear,
        region: data.region,
        gender: data.gender,
        refreshToken: data.refreshToken,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        birthyear: true,
        region: true,
        gender: true,
        refreshToken: true,
      },
    });
  }

  async getUserById(id: number): Promise<UserBaseInfo | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        birthyear: true,
        region: true,
        gender: true,
        refreshToken: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserBaseInfo | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        birthyear: true,
        region: true,
        gender: true,
        refreshToken: true,
      },
    });
  }
}
