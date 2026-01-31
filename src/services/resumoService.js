import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";
import * as cidadeService from "./cidadeService.js";
import dotenv from "dotenv";
import resumoRepository from "../repositories/resumoRepository.js"
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

export async function criarResumoService(data, longitude, latitude, resumo, apiCall) {
    if(!(data&&longitude&&latitude&&resumo)){
        throw new Error("Os campo data, longitude, latitude e resumo são necessarios!")
    }

    if(apiCall !== Object){
        apiCall = "Nao foi enviado!"
    }

    if(!((data.split("").length===10&&data[4]==="-"&&data[7]==="-")&&parseInt((data.slice(5,7))) > 0 && parseInt(data.slice(5,7)) < 13 && parseInt(data.slice(8,10)) > 0 && parseInt(data.slice(8,10)) < 32)){//verifica o formato da data
        throw new Error("Data precisa estar em formato ISO! Ex: 2020-05-30")
    }

    const resumoTotal = {
        data,
        longitude,
        latitude,
        resumo,
        apiCall
    }

    return await resumoRepository.criar(resumoTotal)
}