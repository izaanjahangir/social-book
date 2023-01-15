import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { PostComment } from 'src/entities/postComment.entity';
import { PostLike } from 'src/entities/postLike.entity';
import { Repository, DataSource } from 'typeorm';
import {
  PostCommentCreate,
  PostCommentEdit,
} from '../interfaces/post-comment.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private postLikeRepository: Repository<PostLike>,
    @InjectRepository(PostComment)
    private postCommentRepository: Repository<PostComment>,
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
      .loadRelationCountAndMap('post.totalComments', 'post.comments')
      .getMany();
  }

  async getById(id: number) {
    return this.dataSource
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'postComments')
      .leftJoinAndSelect('post.likes', 'postLikes')
      .getOne();
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

  comment(data: PostCommentCreate) {
    const postComment = this.postCommentRepository.create({
      userId: data.userId,
      postId: data.postId,
      text: data.text,
    });

    return this.postCommentRepository.save(postComment);
  }

  editComment(data: PostCommentEdit) {
    return this.dataSource
      .getRepository(PostComment)
      .createQueryBuilder('post_comment')
      .update(PostComment)
      .set({ text: data.text })
      .where('userId = :userId', { userId: data.userId })
      .where('id = :commentId', { commentId: data.commentId })
      .andWhere('postId = :postId', { postId: data.postId })
      .execute();
  }
}
