import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostLike } from './entities/postLike.entity';
import { PostComment } from './entities/postComment.entity';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
