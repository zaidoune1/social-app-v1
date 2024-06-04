import { comments } from "../comments";

export interface commentsDaos {
  addComment(comment: comments): Promise<void>;

  getOneComment(id: number): Promise<comments | void>;

  getAllComment(): Promise<comments[] | void>;

  deleteComment(id: number): Promise<string | void>;

  updateComment(id: number, comment: comments): Promise<comments | void>;
}
