import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";
import cidadeRepository from "../repositories/cidadeRepository.js"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


export async function mostrarCidadeService() {
    return await cidadeRepository.mostrar()
}

export async function criarCidadeService(nome, latitude, longitude) {
    if(!(nome&&latitude&&longitude)){
        throw new Error("Todos os campos são necessarios!")
    }

    const cidade = {nome, latitude, longitude}
    return await cidadeRepository.criar(cidade)
}

