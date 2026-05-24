import { db } from "./db.js";
import { cidade, uf } from "./schema.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { eq } from "drizzle-orm";
import { rl } from "./menu.js";
export async function cadastrarCidade() {
    console.log("\n=== CADASTRAR CIDADE ===");
    const ufs = await db.select().from(uf);
    if (ufs.length === 0) {
        console.log("Nenhuma UF cadastrada. Cadastre uma UF primeiro.");
        return;
    }
    console.log("UFs disponíveis:");
    for (const item of ufs) {
        console.log(`${item.id} - ${item.nome} (${item.sigla})`);
    }
    const ufIdTexto = await rl.question("Escolha o ID da UF: ");
    const ufId = Number(ufIdTexto.trim());
    if (Number.isNaN(ufId)) {
        console.log("ID inválido.");
        return;
    }
    const ufSelecionada = await db.select().from(uf).where(eq(uf.id, ufId)).limit(1);
    if (ufSelecionada.length === 0) {
        console.log("UF não encontrada.");
        return;
    }
    const nomeCidade = (await rl.question("Nome da cidade: ")).trim();
    if (!nomeCidade) {
        console.log("Nome da cidade é obrigatório.");
        return;
    }
    await db.insert(cidade).values({
        nome: nomeCidade,
        ufId,
    });
    console.log("Cidade cadastrada com sucesso.");
    let sair = false;
    console.log("\n(z)-Voltar");
    while (!sair) {
        let voltarMenu = (await rl.question("> ")).trim();
        if (voltarMenu.toLowerCase() === "z") {
            return;
        }
    }
}
//# sourceMappingURL=cidades.js.map