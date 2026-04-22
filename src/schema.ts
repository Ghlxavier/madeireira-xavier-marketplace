import { sqliteTable, integer, text, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm"

export const uf = sqliteTable("uf", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  sigla: text("sigla").notNull(),
});

export const cidade = sqliteTable("cidade", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
  ufId: integer("uf_id").notNull(),
});

export const noticia = sqliteTable("noticia", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titulo: text("titulo").notNull(),
  texto: text("texto").notNull(),
  cidadeId: integer("cidade_id").notNull(),
  dataCriacao: text("data_criacao").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const tag = sqliteTable('tag', {
  id: integer('id').primaryKey(),
  nome: text('nome'),
});

export const noticiaTag = sqliteTable("noticia_tag", {
  noticiaId: integer("noticia_id").notNull().references(() => noticia.id),
  tagId: integer("tag_id").notNull().references(() => tag.id),
}, (table) => ({
  pk: primaryKey({ columns: [table.noticiaId, table.tagId] }),
}));


//Exemplo de como converter ao exibir
//const dataLocal = new Date(item.dataCriacao + " UTC").toLocaleString("pt-BR");
//console.log(Data: ${dataLocal});