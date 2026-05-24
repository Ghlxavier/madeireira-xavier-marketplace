import { initDb } from "./initDB.js";
import { mostrarMenu } from "./menu.js";
import { cadastrarUf } from "./ufs.js";
import { cadastrarCidade } from "./cidades.js";
import { cadastra_noticia } from "./cadastra_noticia.js";
import { listarNoticias } from "./organizar_noticias.js";
import { listarAgrupadoPorEstado, listarNoticiasPorEstado } from "./opcoes_extras.js";
initDb();
async function main() {
    let sair = false;
    while (!sair) {
        const opcao = await mostrarMenu();
        switch (opcao) {
            case "0":
                await cadastra_noticia();
                break;
            case "1":
                await listarNoticias("ASC");
                break;
            case "2":
                await listarNoticias("DESC");
                break;
            case "3":
                await listarNoticiasPorEstado();
                break;
            case "4":
                await listarAgrupadoPorEstado();
                break;
            case "5":
                await cadastrarUf();
                break;
            case "6":
                await cadastrarCidade();
                break;
            case "7":
                sair = true;
                console.log("Encerrando o programa...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
    }
}
main().catch((erro) => {
    console.error("Erro ao executar o programa:", erro);
});
//# sourceMappingURL=index.js.map