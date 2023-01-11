import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  register(user: RegisterDto) {
    const foundUser = this.userService.findByEmail(user.email);

    if (foundUser) {
      throw new Error('Email already exist');
    }

    return this.userService.create(user as User);
  }
}
