import { posts } from "../posts";

export interface postsDaos {
  addPost(post: posts): Promise<posts | void>;

  getOnePost(id: string): Promise<posts | void>;

  getAllPostes(): Promise<posts[] | void>;

  deletePosts(id: string): Promise<string | void>;

  updatePost(id: string, post: posts): Promise<posts | void>;
}
