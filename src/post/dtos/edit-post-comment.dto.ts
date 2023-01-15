import { IsNumber, IsString } from 'class-validator';

export class EditPostCommentDto {
  @IsNumber({}, { message: 'Post id must be a number' })
  postId: number;

  @IsString()
  text: string;
}
