import { posts } from "../posts";

export interface postsDaos {
  addPost(post: posts): void;

  getOnePost(id: number): posts | void;

  getAllPostes(posts: posts[]): posts[] | void;

  deletePosts(id: number): string | void;

  updatePost(id: number, post: posts): posts | void;
}
