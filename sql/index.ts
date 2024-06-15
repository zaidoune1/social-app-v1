import { GetDaos } from "../src/utils/getDaos";
import { comments } from "../types/comments";
import { likes } from "../types/likes";
import { posts } from "../types/posts";
import { user } from "../types/user";
import sqlite3 from "sqlite3";
import { open as sqLiteDb, Database } from "sqlite";
import path from "path";
import { query } from "express";

export class SqlMemoryDb implements GetDaos {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async connectDb() {
    this.db = await sqLiteDb({
      filename: path.join(__dirname, "socialApp.sqlite"),
      driver: sqlite3.Database,
    });
    this.db.run("PRAGMA foreign_keys = ON;");
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
  async addPost(post: posts): Promise<posts | void> {
    const query =
      "INSERT INTO Posts (id, userId, post, url, postedAt) VALUES(?, ?, ?, ?, ?)";
    await this.db.run(
      query,
      post.id,
      post.userId,
      post.post,
      post.url,
      post.postedAt
    );
  }
  async getOnePost(id: string): Promise<posts | void> {
    const query = "SELECT * FROM posts WHERE id = ?";

    return await this.db.get(query, id);
  }
  async getAllPostes(): Promise<posts[] | void> {
    const query = "SELECT * FROM posts";
    return await this.db.all<posts[]>(query);
  }
  async deletePosts(id: string): Promise<string | void> {
    const query = "DELETE FROM posts WHERE id = ?";
    await this.db.run(query, id);
  }
  async updatePost(id: string, newPost: posts): Promise<void | posts> {
    const query = "UPDATE posts SET post = ?, url = ? WHERE id = ?";
    await this.db.run(query, newPost.post, newPost.url, id);
  }
  async addUser(user: user): Promise<user | void> {
    const query =
      "INSERT INTO Users (id, userName, lastName, email, password ) VALUES (?, ?, ?, ?, ?)";

    await this.db.run(
      query,
      user.id,
      user.userName,
      user.lastName,
      user.email,
      user.password
    );
  }
  async getOneUser(id: string): Promise<user | undefined> {
    const query = `SELECT * FROM Users WHERE Users.id = ?`;
    return await this.db.get(query, id);
  }

  async getUserByEmail(email: string): Promise<user | void> {
    const query = `SELECT * FROM Users WHERE Users.email = ?`;
    return await this.db.get(query, email);
  }

  async getAllUsers(): Promise<user[]> {
    const query = "SELECT * FROM Users";
    return this.db.all<user[]>(query);
  }
  async deleteUsers(id: string): Promise<string | void> {
    const query = "DELETE FROM Users WHERE id = ? ";
    this.db.run(query, id);
  }
  async updateUsers(id: string, user: user): Promise<void | user> {
    const query = `UPDATE Users SET userName = ?, lastName = ?, email = ?, password = ? WHERE id = ?`;

    await this.db.run(
      query,
      user.userName,
      user.lastName,
      user.email,
      user.password,
      id
    );
  }
}
