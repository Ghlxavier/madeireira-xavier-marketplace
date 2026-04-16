import { db } from "./db.js";
import { noticia, cidade, uf } from "./schema.js";
import { eq, asc, desc } from "drizzle-orm";
import { rl } from "./menu.js";

// --- OPÇÃO 3: Notícias de um estado específico ---
export async function listarNoticiasPorEstado() {
    const ufs = await db.select().from(uf);
    
    if (ufs.length === 0) {
        console.log("Nenhuma UF cadastrada.");
        return;
    }

    console.log("\n=== SELECIONE O ESTADO ===");
    ufs.forEach(item => console.log(`${item.id} - ${item.nome} (${item.sigla})`));

    const ufId = parseInt(await rl.question("Informe o ID do estado: "));
    
    console.log("\n(a) Ordenar por mais recentes");
    console.log("(b) Ordenar por mais antigas");
    console.log("(z) Voltar");
    const ordemOpcao = (await rl.question("Escolha a ordenação: ")).toLowerCase();

    if (ordemOpcao === 'z') return;

    const resultados = await db
        .select({
            titulo: noticia.titulo,
            data: noticia.dataCriacao,
            cidadeNome: cidade.nome
        })
        .from(noticia)
        .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
        .innerJoin(uf, eq(cidade.ufId, uf.id))
        .where(eq(uf.id, ufId))
        .orderBy(ordemOpcao === 'a' ? desc(noticia.dataCriacao) : asc(noticia.dataCriacao));

    if (resultados.length === 0) {
        console.log("Nenhuma notícia encontrada para este estado.");
    } else {
        resultados.forEach(n => {
            console.log(`[${n.data}] ${n.titulo} - ${n.cidadeNome}`);
        });
    }
    let sair = false;
    console.log("\n(z)-Voltar");
    while (!sair){
        let voltarMenu = (await rl.question("> ")).trim();
        if (voltarMenu.toLowerCase() === "z") {
            return;
        }
    }
}

// --- OPÇÃO 4: Notícias agrupadas por estado ---
export async function listarAgrupadoPorEstado() {
    // Buscamos todas as notícias com os dados de UF e Cidade
    const listaCompleta = await db
        .select({
            idNoticia: noticia.id,
            titulo: noticia.titulo,
            texto: noticia.texto,
            cidadeNome: cidade.nome,
            ufSigla: uf.sigla
        })
        .from(noticia)
        .innerJoin(cidade, eq(noticia.cidadeId, cidade.id))
        .innerJoin(uf, eq(cidade.ufId, uf.id))
        .orderBy(asc(uf.sigla));

    if (listaCompleta.length === 0) {
        console.log("Nenhuma notícia cadastrada.");
        return;
    }

    console.log("\n--- LISTA AGRUPADA POR ESTADOS ---");
    let ufAtual = "";
    let contadorSequencial = 1;
    // Map para guardar a relação (Número da lista -> Dados da Notícia)
    const mapaNoticias = new Map();

    listaCompleta.forEach((item) => {
        if (item.ufSigla !== ufAtual) {
            ufAtual = item.ufSigla;
            console.log(`# ${ufAtual}`);
        }
        console.log(`${contadorSequencial} - ${item.titulo} - ${item.cidadeNome}`);
        mapaNoticias.set(contadorSequencial, item);
        contadorSequencial++;
    });

    console.log("\n(d) Detalhar notícia");
    console.log("(z) Voltar");
    
    const acao = (await rl.question("Escolha uma opção: ")).toLowerCase();

    if (acao === 'd') {
        const num = parseInt(await rl.question("Informe o número da notícia: "));
        const noticiaSelecionada = mapaNoticias.get(num);

        if (noticiaSelecionada) {
            console.log("\n-------------------------------------------");
            console.log(`Título: ${noticiaSelecionada.titulo}`);
            console.log(`Texto : ${noticiaSelecionada.texto}`);
            console.log(`Local : ${noticiaSelecionada.cidadeNome} / ${noticiaSelecionada.ufSigla}`);
            console.log("-------------------------------------------");
        } else {
            console.log("Número inválido.");
        }
    }

    let sair = false;
    console.log("\n(z)-Voltar");
    while (!sair){
        let voltarMenu = (await rl.question("> ")).trim();
        if (voltarMenu.toLowerCase() === "z") {
            return;
        }
    }
}