import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): any {
    console.log({
      function: 'handleRequest',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      err,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      info,
      context,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      status,
    });

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
