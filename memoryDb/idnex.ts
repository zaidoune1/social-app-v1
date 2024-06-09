import { comments } from "../types/comments";
import { likes } from "../types/likes";
import { posts } from "../types/posts";
import { user } from "../types/user";
import { GetDaos } from "./getDaos";

export class InMemoryDataBase implements GetDaos {
  private posts: posts[] = [];
  private users: user[] = [];
  private comments: comments[] = [];
  private likes: likes[] = [];

  addComment(comment: comments): void {
    this.comments.push(comment);
  }
  getOneComment(id: number): void | comments {
    this.comments.find((com) => com.id === id);
  }
  getAllComment(): void | comments[] {
    return this.comments;
  }
  deleteComment(id: number): string | void {
    this.comments.filter((com) => com.id === id);
  }
  updateComment(id: number, comment: comments): void | comments {
    this.comments.map((com) => (com.id === id ? comment : com));
  }
  addLikes(like: likes): void {
    this.likes.push(like);
  }
  getOneLikes(id: number): void | likes {
    this.likes.find((like) => like.id === id);
  }
  getAllLikes(): void | likes[] {
    return this.likes;
  }
  deleteLikes(id: number): string | void {
    this.likes.filter((oneLike) => oneLike.id === id);
  }
  updateLikes(id: number, like: likes): void | likes {
    this.likes.map((oneLike) => (oneLike.id === id ? like : oneLike));
  }
  addPost(post: posts): void {
    this.posts.push(post);
  }
  getOnePost(id: number): void | posts {
    const findPost = this.posts.find((item) => item.id === id);
    return findPost;
  }
  getAllPostes(): void | posts[] {
    return this.posts;
  }
  deletePosts(id: number): string | void {
    this.posts.filter((item) => item.id !== id);
  }
  updatePost(id: number, postUpdated: posts): void | posts {
    this.posts.map((post) => (post.id === id ? postUpdated : post));
  }
  addUser(user: user): void {
    this.users.push(user);
  }
  getOneUser(id: number): void | user {
    return this.users.find((user) => user.id === id);
  }
  getAllUsers(): void | user[] {
    return this.users;
  }
  deleteUsers(id: number): string | void {
    this.users.filter((user) => user.id !== id);
  }
  updateUsers(id: number, userUpdated: user): void | user {
    this.users.map((user) => (user.id === id ? userUpdated : user));
  }
}
