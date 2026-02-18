import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";
import { chamarGeoConding } from "../utils/chamarGeoConding.js"
import cidadeRepository from "../repositories/cidadeRepository.js"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


export async function mostrarCidadeService() {
    return await cidadeRepository.mostrar()
}

export async function criarCidadeService(nome, nomeUrlSafe, latitude, longitude) {
    if(!(nome&&nomeUrlSafe&&latitude&&longitude)){
        throw new Error("Todos os campos são necessarios!")
    }
    
    const isUrlSafe = /^[a-z0-9-]+$/.test(nomeUrlSafe)

    if (!isUrlSafe) {
        throw new Error("nomeUrlSafe não é válido para URL")
    }
    
    const cidade = {nome, nomeUrlSafe, latitude, longitude}
    return await cidadeRepository.criar(cidade)
}

export async function buscarCidadeService(nome) {
    if(!nome){
        throw new Error("Nome é necessario!")
    }

    if(nome.trim().length < 3){
        throw new Error("Nome precisa de pelo menos 3 letras!")
    }

    const resultado = chamarGeoConding(nome)

    return resultado
}