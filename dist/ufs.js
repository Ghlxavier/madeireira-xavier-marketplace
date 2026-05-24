import { db } from "./db.js";
import { uf } from "./schema.js";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { rl } from "./menu.js";
export async function cadastrarUf() {
    console.log("\n=== CADASTRAR UF ===");
    const nome = (await rl.question("Nome da UF: ")).trim();
    const sigla = (await rl.question("Sigla da UF: ")).trim().toUpperCase();
    if (!nome || !sigla) {
        console.log("Nome e sigla são obrigatórios.");
        return;
    }
    await db.insert(uf).values({ nome, sigla });
    console.log("UF cadastrada com sucesso.");
    let sair = false;
    console.log("\n(z)-Voltar");
    while (!sair) {
        let voltarMenu = (await rl.question("> ")).trim();
        if (voltarMenu.toLowerCase() === "z") {
            return;
        }
    }
}
export async function listarUfs() {
    const ufs = await db.select().from(uf);
    if (ufs.length === 0) {
        console.log("Nenhuma UF cadastrada.");
        return;
    }
    console.log("\n=== UFs CADASTRADAS ===");
    for (const item of ufs) {
        console.log(`${item.id} - ${item.nome} (${item.sigla})`);
    }
    let sair = false;
    console.log("\n(z)-Voltar");
    while (!sair) {
        let voltarMenu = (await rl.question("> ")).trim();
        if (voltarMenu.toLowerCase() === "z") {
            return;
        }
    }
}
//# sourceMappingURL=ufs.js.map