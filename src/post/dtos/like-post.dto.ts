import { IsNumber } from 'class-validator';

export class LikePostDto {
  @IsNumber({}, { message: 'Post id must be a number' })
  postId: number;
}
