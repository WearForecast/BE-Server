import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
};

@Injectable()
export class UsersService {}
