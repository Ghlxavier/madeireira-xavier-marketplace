import { db } from "./db.js";
import { noticia } from "./schema.js";
import { asc, desc } from "drizzle-orm";
import {rl } from "./menu.js";

type Noticia = {
  titulo: string;
  texto: string;
  dataCriacao: string;
};

export async function listarNoticias(ordem: "ASC" | "DESC") {
  const noticias = await db
    .select()
    .from(noticia)
    .orderBy(ordem === "ASC" ? asc(noticia.dataCriacao) : desc(noticia.dataCriacao));

  if (noticias.length === 0) {
    console.log("Nenhuma notícia cadastrada.");
    return;
  }

  for (const item of noticias) {
    console.log("\n----------------------");
    console.log(`Título: ${item.titulo}`);
    console.log(`Conteúdo: ${item.texto}`);
    console.log(`Data: ${item.dataCriacao}`);
  }

  console.log("\nTotal de notícias:", noticias.length);

  let sair = false;
  console.log("\n(z)-Voltar");
  while (!sair){
    let voltarMenu = (await rl.question("> ")).trim();
    if (voltarMenu.toLowerCase() === "z") {
        return;
    }
  }
}