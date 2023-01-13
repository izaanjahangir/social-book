import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
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
}
