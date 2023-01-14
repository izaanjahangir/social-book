import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostLike } from './entities/postLike.entity';

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
      entities: [User, Post, PostLike],
      synchronize: true,
    }),
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
