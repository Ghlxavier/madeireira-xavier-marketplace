import { sqlite } from "./db.js";

export function initDb() {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS uf (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      sigla TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cidade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      uf_id INTEGER NOT NULL,
      FOREIGN KEY (uf_id) REFERENCES uf(id)
    );

    CREATE TABLE IF NOT EXISTS noticia (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      texto TEXT NOT NULL,
      cidade_id INTEGER NOT NULL,
      data_criacao TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cidade_id) REFERENCES cidade(id)
    );
  `);
}