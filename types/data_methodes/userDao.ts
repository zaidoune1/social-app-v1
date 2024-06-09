import { user } from "../user";

export interface usersDaos {
  addUser(user: user): void;

  getOneUser(id: number): user | void;

  getAllUsers(): Promise<user[] | void>;

  deleteUsers(id: number): Promise<string | void>;

  updateUsers(id: number, user: user): Promise<user | void>;
}
