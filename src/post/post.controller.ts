import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { Post as PostEntity } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePostCommentDto } from './dtos/create-post-comment.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { EditPostCommentDto } from './dtos/edit-post-comment.dto';
import { LikePostDto } from './dtos/like-post.dto';
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

  @Post('like')
  async likeAPost(@Body() body: LikePostDto, @CurrentUser() authUser: User) {
    await this.postService.likeAndDislike(authUser.id, body.postId);

    return { data: {} };
  }

  @Post('comment')
  async addComment(
    @Body() body: CreatePostCommentDto,
    @CurrentUser() authUser: User,
  ) {
    await this.postService.comment({ ...body, userId: authUser.id });

    return { data: {} };
  }

  @Patch('comment/:id')
  async editComment(
    @Body() body: EditPostCommentDto,
    @CurrentUser() authUser: User,
    @Param('id') commentId: string,
  ) {
    const response = await this.postService.editComment({
      ...body,
      userId: authUser.id,
      commentId: Number(commentId),
    });

    if (response.affected === 0) {
      throw new NotFoundException('Comment not found');
    }

    return { data: {} };
  }

  @Delete('comment/:id')
  async deleteComment(
    @CurrentUser() authUser: User,
    @Param('id') commentId: string,
  ) {
    const response = await this.postService.deleteComment(
      Number(commentId),
      authUser.id,
    );

    if (response.affected === 0) {
      throw new NotFoundException('Comment not found');
    }

    return { data: {} };
  }
}
