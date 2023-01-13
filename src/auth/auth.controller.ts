import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    try {
      await this.authService.register(body);

      return {};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    try {
      const { user, token } = await this.authService.login(
        body.email,
        body.password,
      );

      return { user, token };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/profile')
  async getProfile() {
    try {
      return {};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
