import { likes } from "../likes";

export interface likesDaos {
  addLikes(like: likes): Promise<void>;

  getOneLikes(id: number): Promise<likes | void>;

  getAllLikes(): Promise<likes[] | void>;

  deleteLikes(id: number): Promise<string | void>;

  updateLikes(id: number, like: likes): Promise<likes | void>;
}
