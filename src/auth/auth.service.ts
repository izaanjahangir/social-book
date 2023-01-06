import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  register(user: RegisterDto) {
    const userResponse = this.usersRepository.create(user);

    return this.usersRepository.save(userResponse);
  }
}
