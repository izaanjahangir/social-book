import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: User) {
    const userResponse = this.usersRepository.create(user);

    return this.usersRepository.save(userResponse);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}
