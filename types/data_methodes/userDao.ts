import { user } from "../user";

export interface usersDaos {
  addUser(user: user): Promise<user | void>;

  getOneUser(id: string): Promise<user | void>;

  getAllUsers(): Promise<user[] | void>;

  deleteUsers(id: string): Promise<string | void>;

  updateUsers(id: string, user: user): Promise<user | void>;
}
