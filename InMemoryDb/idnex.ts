import { comments } from "../types/comments";
import { likes } from "../types/likes";
import { posts } from "../types/posts";
import { user } from "../types/user";
import { GetDaos } from "../src/utils/getDaos";

export class InMemoryDataBase implements GetDaos {
  private posts: posts[] = [];
  private users: user[] = [];
  private comments: comments[] = [];
  private likes: likes[] = [];

  async addComment(comment: comments): Promise<void> {
    this.comments.push(comment);
  }
  async getOneComment(id: number): Promise<void | comments> {
    this.comments.find((com) => com.id === id);
  }
  async getAllComment(): Promise<void | comments[]> {
    return this.comments;
  }
  async deleteComment(id: number): Promise<string | void> {
    this.comments.filter((com) => com.id === id);
  }
  async updateComment(id: number, comment: comments): Promise<void | comments> {
    this.comments.map((com) => (com.id === id ? comment : com));
  }
  async addLikes(like: likes): Promise<void> {
    this.likes.push(like);
  }
  async getOneLikes(id: number): Promise<void | likes> {
    this.likes.find((like) => like.id === id);
  }
  async getAllLikes(): Promise<void | likes[]> {
    return this.likes;
  }
  async deleteLikes(id: number): Promise<string | void> {
    this.likes.filter((oneLike) => oneLike.id === id);
  }
  async updateLikes(id: number, like: likes): Promise<void | likes> {
    this.likes.map((oneLike) => (oneLike.id === id ? like : oneLike));
  }
  async addPost(post: posts): Promise<void> {
    this.posts.push(post);
  }
  async getOnePost(id: number): Promise<void | posts> {
    const findPost = this.posts.find((item) => item.id === id);
    return findPost;
  }
  async getAllPostes(): Promise<void | posts[]> {
    return this.posts;
  }
  async deletePosts(id: number): Promise<string | void> {
    this.posts.filter((item) => item.id !== id);
  }
  async updatePost(id: number, postUpdated: posts): Promise<void | posts> {
    this.posts.map((post) => (post.id === id ? postUpdated : post));
  }
  async addUser(user: user): Promise<void> {
    this.users.push(user);
  }
  getOneUser(id: number): void | user {
    return this.users.find((user) => user.id === id);
  }
  async getAllUsers(): Promise<void | user[]> {
    return this.users;
  }
  async deleteUsers(id: number): Promise<string | void> {
    this.users.filter((user) => user.id !== id);
  }
  async updateUsers(id: number, userUpdated: user): Promise<void | user> {
    this.users.map((user) => (user.id === id ? userUpdated : user));
  }
}
