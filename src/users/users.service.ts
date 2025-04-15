import { Injectable } from '@nestjs/common';

export type UserCredentials = {
  username: string;
  password: string;
};

export type User = {
  userId: number;
  username: string;
  password: string;
};

export type PublicUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
