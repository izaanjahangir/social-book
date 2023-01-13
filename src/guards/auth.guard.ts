import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['authorization'];

    if (token) {
      try {
        const jwtToken = token.split(' ')[1];
        const decoded = jwt.verify(jwtToken, 'asdkasdjkasjdkasjdk');

        const user = await this.userService.findById(decoded.userId);

        request.currentUser = user;
      } catch (e) {
        throw new UnauthorizedException('Access denied');
      }
    }

    return Boolean(request.currentUser);
  }
}
