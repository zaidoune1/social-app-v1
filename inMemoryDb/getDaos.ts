import { commentsDaos } from "../types/data_methodes/commentsDao";
import { likesDaos } from "../types/data_methodes/likesDao";
import { postsDaos } from "../types/data_methodes/postsDao";
import { usersDaos } from "../types/data_methodes/userDao";
import { InMemoryDataBase } from "./idnex";

export interface GetDaos
  extends commentsDaos,
    likesDaos,
    postsDaos,
    usersDaos {}

export const db = InMemoryDataBase;
