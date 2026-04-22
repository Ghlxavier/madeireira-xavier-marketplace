import { db } from "./db.js";
import readline from "readline/promises";
import {rl } from "./menu.js";
import { stdin as input, stdout as output } from "node:process";
import { cidade, noticia, uf, tag, noticiaTag} from "./schema.js";
import { eq } from 'drizzle-orm';

const ufs = await db.select().from(uf);
const cidades = await db.select().from(cidade);

async function mostrar_cidades(){
    //gere um menu com todas cidades cadastradas:
    let opc: number = 1;

    for (const item of cidades) {
    console.log(`${opc} - ${item.nome}`); //Trocar o id por sigla
    opc++;
    }
    return opc
}

export async function cadastra_noticia(){
    const titulo = (await rl.question("Qual o Titulo da Noticia: ")).trim();
    const texto = (await rl.question("Digite a materia:\n")).trim();

    if (!titulo || !texto){
        console.log("Titulo e materia são obrigatorios para cadastro!");
        return;
    }

    let cidadeId;
    let sair = false;

    while (!sair){
        let opc: number = await mostrar_cidades();
        cidadeId = await (await rl.question("Escolha o id da cidade: ")).trim();

        cidadeId = parseInt(cidadeId);
        if (isNaN(cidadeId)){console.log("Digite um número valido!"); continue;}
        if (cidadeId < 1 || cidadeId > opc){console.log("Opção invalida!"); continue;}
        else if (cidadeId == 0){sair = true;}

        //Guardar as matérias no bd:
        const cidadeSelecionada = cidades[cidadeId - 1];
        const cidadeIdReal = cidadeSelecionada.id;
        
        const noticiaInserida = await db.insert(noticia).values({ titulo, texto, cidadeId: cidadeIdReal }).returning({ id: noticia.id });
        console.log("Noticia cadastrada!")
        
         // Solicitar tags para a notícia
        console.log('Digite as tags para a notícia (separadas por vírgula, ou pressione Enter para nenhuma):');
        const tagsInput = (await rl.question('> ')).trim();

        if (tagsInput) {
          const tagsNomes = tagsInput.split(',').map(t => t.trim()).filter(t => t);

          for (const tagNome of tagsNomes) {
            // Verificar se a tag já existe
            let tagExistente = await db.select().from(tag).where(eq(tag.nome, tagNome)).limit(1);
            let tagId: number;

            if (tagExistente.length > 0) {
              tagId = tagExistente[0].id;
            } else {
              // Criar nova tag
              const novaTag = await db.insert(tag).values({ nome: tagNome }).returning({ id: tag.id });
              tagId = novaTag[0].id;
            }

            // Associar notícia à tag
            await db.insert(noticiaTag).values({ noticiaId: noticiaInserida[0].id, tagId });
          }

          console.log('Tags associadas com sucesso!');
        }

        console.log("\n(z)-Voltar");
        while (!sair){
            let voltarMenu = (await rl.question("> ")).trim();
            if (voltarMenu.toLowerCase() === "z") {
                return;
            }
        }
    }
}
