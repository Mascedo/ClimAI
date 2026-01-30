import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";
import * as cidadeService from "./cidadeService.js";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


export async function resumoService(nome) {
    if(!(nome)){
        throw new Error("O campo cidade é necessario!")
    }

    const cidades = await cidadeService.mostrarCidadeService()

    const existe = cidades.some(
        cidade => cidade.nomeUrlSafe === nome.toLowerCase()
    )

    if(!existe){
        throw new Error(`Cidade ${nome}, não esta no banco de dados!`)
    }
    if(existe){
        return "existe"
    }
}