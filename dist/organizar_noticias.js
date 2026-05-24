import { db } from "./db.js";
import { noticia, tag, noticiaTag } from "./schema.js";
import { asc, desc } from "drizzle-orm";
import { rl } from "./menu.js";
import { eq } from "drizzle-orm";
export async function listarNoticias(ordem) {
    const noticiasComTags = await db
        .select({
        id: noticia.id,
        titulo: noticia.titulo,
        texto: noticia.texto,
        dataCriacao: noticia.dataCriacao,
        tagNome: tag.nome,
    })
        .from(noticia)
        .leftJoin(noticiaTag, eq(noticia.id, noticiaTag.noticiaId))
        .leftJoin(tag, eq(noticiaTag.tagId, tag.id))
        .orderBy(ordem === "ASC" ? asc(noticia.dataCriacao) : desc(noticia.dataCriacao));
    // Agrupar tags por notícia
    const noticiasAgrupadas = noticiasComTags.reduce((acc, row) => {
        const key = row.id;
        if (!acc[key]) {
            acc[key] = {
                titulo: row.titulo,
                texto: row.texto,
                dataCriacao: row.dataCriacao,
                tags: [],
            };
        }
        if (row.tagNome) {
            acc[key].tags.push(row.tagNome);
        }
        return acc;
    }, {});
    if (Object.values(noticiasAgrupadas).length === 0) {
        console.log("Nenhuma notícia cadastrada.");
        return;
    }
    for (const item of Object.values(noticiasAgrupadas)) {
        console.log("\n----------------------");
        console.log(`Título: ${item.titulo}`);
        console.log(`Conteúdo: ${item.texto}`);
        console.log(`Data: ${item.dataCriacao}`);
        console.log(`Tags: ${item.tags.length > 0 ? item.tags.join(", ") : "Nenhuma tag"}`);
    }
    console.log("\nTotal de notícias:", Object.values(noticiasAgrupadas).length);
    let sair = false;
    console.log("\n(z)-Voltar");
    while (!sair) {
        let voltarMenu = (await rl.question("> ")).trim();
        if (voltarMenu.toLowerCase() === "z") {
            return;
        }
    }
}
//# sourceMappingURL=organizar_noticias.js.map