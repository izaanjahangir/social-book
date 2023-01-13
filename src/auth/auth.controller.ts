import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  async getProfile(@CurrentUser() authUser: User) {
    try {
      console.log('authUser =>', authUser);

      return {};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
