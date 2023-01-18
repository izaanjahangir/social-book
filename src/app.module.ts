import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostLike } from './entities/postLike.entity';
import { PostComment } from './entities/postComment.entity';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './filters/custom-exception.filter';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'izaan',
      password: '12345678',
      database: 'test',
      entities: [User, Post, PostLike, PostComment],
      synchronize: true,
    }),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
