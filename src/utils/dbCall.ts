import { InMemoryDataBase } from "../../InMemoryDb/idnex";
import { SqlMemoryDb } from "../../sql";
import { GetDaos } from "./getDaos";

export let db: GetDaos;

export const initDb = async () => {
  // return (db = new InMemoryDataBase());
  return (db = await new SqlMemoryDb().connectDb());
};
