import { Injectable } from '@nestjs/common';
import {
  UsersService,
  PublicUser,
  UserCredentials,
} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export type userJWT = {
  userId: number;
  username: string;
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(credentials: UserCredentials) {
    const user = await this.usersService.findOne(credentials.username);

    if (!!user && (await bcrypt.compare(credentials.password, user.password))) {
      return { id: user.id, username: user.username };
    }

    return null;
  }

  login(user: PublicUser): userJWT {
    return {
      userId: user.userId,
      username: user.username,
      access_token: this.jwtService.sign(user),
    };
  }
}
