import { likes } from "../likes";

export interface likesDaos {
  addLikes(like: likes): void;

  getOneLikes(id: number): likes | void;

  getAllLikes(): likes[] | void;

  deleteLikes(id: number): string | void;

  updateLikes(id: number, like: likes): likes | void;
}
