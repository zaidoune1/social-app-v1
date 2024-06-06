import { user } from "../user";

export interface usersDaos {
  addUser(user: user): void;

  getOneUser(id: number): user | void;

  getAllUsers(): user[] | void;

  deleteUsers(id: number): string | void;

  updateUsers(id: number, user: user): user | void;
}
