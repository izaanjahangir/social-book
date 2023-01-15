export interface PostCommentCreate {
  userId: number;
  postId: number;
  text: string;
}

export interface PostCommentEdit {
  userId: number;
  postId: number;
  text: string;
  commentId: number
}
