import { Injectable, UnauthorizedException } from '@nestjs/common';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(user: RegisterDto) {
    const foundUser = await this.userService.findByEmail(user.email);

    if (foundUser) {
      throw new Error('Email already exist');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    const payload: User = { ...user, password: hash } as User;

    return this.userService.create(payload);
  }

  async login(email: string, password: string) {
    const foundUser = await this.userService.findByEmailWithPassword(email);

    if (!foundUser) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const passwordMatched = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    delete foundUser.password;

    const token = jwt.sign({ userId: foundUser.id }, 'asdkasdjkasjdkasjdk');

    return { user: foundUser, token };
  }
}
