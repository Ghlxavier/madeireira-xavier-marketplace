import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const rl = readline.createInterface({ input, output });

export async function mostrarMenu() {
  console.log("\n=== MENU PRINCIPAL ===");
  console.log("0 - Cadastrar notícia");
  console.log("1 - Exibir todas as notícias (mais recentes primeiro)");
  console.log("2 - Exibir todas as notícias (mais antigas primeiro)");
  console.log("3 - Exibir notícias de um estado específico");
  console.log("4 - Exibir todas as notícias agrupadas por estado");
  console.log("5 - Cadastrar UF");
  console.log("6 - Cadastrar cidade");
  console.log("7 - Sair");

  const opcao = await rl.question("Escolha uma opção: ");
  return opcao.trim();
}

export function fecharMenu() {
  rl.close();
}