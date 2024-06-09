import { GetDaos } from "../src/utils/getDaos";
import { comments } from "../types/comments";
import { likes } from "../types/likes";
import { posts } from "../types/posts";
import { user } from "../types/user";
import sqlite3 from "sqlite3";
import { open as sqLiteDb, Database } from "sqlite";
import path from "path";
import { db, initDb } from "../src/utils/dbCall";

export class SqlMemoryDb implements GetDaos {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async connectDb() {
    this.db = await sqLiteDb({
      filename: path.join(__dirname, "socialApp.sqlite"),
      driver: sqlite3.Database,
    });
    await this.db
      .migrate({
        migrationsPath: path.join(__dirname, "migrations"),
      })
      .then(() => console.log("data base connected"))
      .catch((err: unknown) => {
        throw new Error(`data base not connected: ${err}`);
      });

    return this;
  }
  addComment(comment: comments): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getOneComment(id: number): Promise<void | comments> {
    throw new Error("Method not implemented.");
  }
  getAllComment(): Promise<void | comments[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(id: number): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  updateComment(id: number, comment: comments): Promise<void | comments> {
    throw new Error("Method not implemented.");
  }
  addLikes(like: likes): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getOneLikes(id: number): Promise<void | likes> {
    throw new Error("Method not implemented.");
  }
  getAllLikes(): Promise<void | likes[]> {
    throw new Error("Method not implemented.");
  }
  deleteLikes(id: number): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  updateLikes(id: number, like: likes): Promise<void | likes> {
    throw new Error("Method not implemented.");
  }
  addPost(post: posts): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getOnePost(id: number): Promise<void | posts> {
    throw new Error("Method not implemented.");
  }
  getAllPostes(posts: posts[]): Promise<void | posts[]> {
    throw new Error("Method not implemented.");
  }
  deletePosts(id: number): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  updatePost(id: number, post: posts): Promise<void | posts> {
    throw new Error("Method not implemented.");
  }
  addUser(user: user): void {
    throw new Error("Method not implemented.");
  }
  getOneUser(id: number): void | user {
    throw new Error("Method not implemented.");
  }
  async getAllUsers(): Promise<void | user[]> {
    const query = "SELECT * FROM users";
  }
  deleteUsers(id: number): Promise<string | void> {
    throw new Error("Method not implemented.");
  }
  updateUsers(id: number, user: user): Promise<void | user> {
    throw new Error("Method not implemented.");
  }
}