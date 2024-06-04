import { posts } from "../posts";

export interface postsDaos {
  addPost(post: posts): Promise<void>;

  getOnePost(id: number): Promise<posts | void>;

  getAllPostes(posts: posts[]): Promise<posts[] | void>;

  deletePosts(id: number): Promise<string | void>;

  updatePost(id: number, post: posts): Promise<posts | void>;
}
