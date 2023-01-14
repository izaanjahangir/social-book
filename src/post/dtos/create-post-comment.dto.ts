import { IsNumber, IsString } from 'class-validator';

export class CreatePostCommentDto {
  @IsNumber({}, { message: 'Post id must be a number' })
  postId: number;

  @IsString()
  text: string;
}
