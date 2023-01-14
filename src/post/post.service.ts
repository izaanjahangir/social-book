import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostLike } from 'src/entities/postLike.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private postLikeRepository: Repository<PostLike>,
    private dataSource: DataSource,
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
    return this.dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .loadRelationCountAndMap('post.totalLikes', 'post.likes')
      .getMany();
  }

  async getById(id: number) {
    return this.dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .leftJoinAndSelect('post.user', 'user').getOne();
  }

  like(userId: number, postId: number) {
    const postLike = this.postLikeRepository.create({ userId, postId });

    return this.postLikeRepository.save(postLike);
  }

  async dislike(userId: number, postId: number) {
    const postLike = await this.postLikeRepository.delete({ userId, postId });

    return postLike;
  }

  async likeAndDislike(userId: number, postId: number) {
    const isAlreadyLiked = await this.postLikeRepository.findOne({
      where: { userId, postId },
    });

    if (isAlreadyLiked) {
      await this.dislike(userId, postId);
    } else {
      await this.like(userId, postId);
    }

    return null;
  }
}
