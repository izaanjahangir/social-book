import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { Post as PostEntity } from 'src/entities/post.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Body() body: CreatePostDto, @CurrentUser() authUser) {
    const post = await this.postService.create({
      ...body,
      user: authUser,
    } as PostEntity);

    return { message: 'Post created', data: { post } };
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postService.getAll();

    return { data: { posts } };
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const post = await this.postService.getById(Number(id));

    return { data: { post } };
  }
}
