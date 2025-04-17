import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
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

    return user;
  }
}
