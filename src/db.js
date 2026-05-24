import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";
// Abre o arquivo do banco SQLite
const sqlite = new Database("madeireira-xavier.db");
// Cria a conexão do Drizzle usando o schema do projeto
export const db = drizzle(sqlite, { schema });
//# sourceMappingURL=db.js.map