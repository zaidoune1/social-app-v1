import { comments } from "../comments";

export interface commentsDaos {
  addComment(comment: comments): void;

  getOneComment(id: number): comments | void;

  getAllComment(): comments[] | void;

  deleteComment(id: number): string | void;

  updateComment(id: number, comment: comments): comments | void;
}
