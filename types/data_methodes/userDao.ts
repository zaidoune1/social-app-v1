import { user } from "../user";

export interface usersDaos {
  addUser(user: user): Promise<user | void>;

  getUserByEmail(email: string): Promise<user | void>;

  getOneUser(id: string): Promise<user | undefined>;

  getAllUsers(): Promise<user[] | undefined>;

  deleteUsers(id: string): Promise<string | void>;

  updateUsers(id: string, user: user): Promise<user | void>;
}
