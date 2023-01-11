import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
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
      const user = await this.authService.login(body.email, body.password);

      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
