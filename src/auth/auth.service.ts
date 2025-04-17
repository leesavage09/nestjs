import { Injectable } from '@nestjs/common';
import {
  UsersService,
  PublicUser,
  UserCredentials,
} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(credentials: UserCredentials): PublicUser | null {
    const user = this.usersService.findOne(credentials.username);
    if (user && user.password === credentials.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: PublicUser) {
    return {
      userId: user.userId,
      username: user.username,
      access_token: this.jwtService.sign(user),
    };
  }
}
