import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type UserCredentials = {
  username: string;
  password: string;
};

type User = {
  userId: number;
  username: string;
  password: string;
};

export type PublicUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string) {
    return this.prismaService.user.findUnique({ where: { username } });
  }
}
