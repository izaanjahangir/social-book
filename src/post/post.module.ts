import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from '../entities/post.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [UserModule, TypeOrmModule.forFeature([Post])],
})
export class PostModule {}
