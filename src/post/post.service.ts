import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostLike } from 'src/entities/postLike.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private postLikeRepository: Repository<PostLike>,
  ) {}

  async create(post: Post) {
    try {
      const response = this.postRepository.create(post);

      const postResponse = await this.postRepository.save(response);
      return postResponse;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getAll() {
    return this.postRepository.find({});
  }

  async getById(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  like(userId: number, postId: number) {
    const postLike = this.postLikeRepository.create({ userId, postId });

    return this.postLikeRepository.save(postLike);
  }
}
