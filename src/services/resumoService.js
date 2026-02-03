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

    const resumos = await resumoRepository.mostrar()

    const existe = cidades.some(                    //verifica se cidade existe na lista de cidade
        cidade => cidade.nomeUrlSafe === nome.toLowerCase()
    )

    if(!existe){
        throw new Error(`Cidade ${nome}, não esta no banco de dados!`)
    }

    const cidadeNome = cidades.find(             //buscaa o nome da cidade na lista de cidade
        cidade => cidade.nomeUrlSafe === nome.toLowerCase()
    )

    const resumoCidade = resumos.find(           // verifica se cidade esxite e buscaa o nome da cidade nos resumos
        resumo => resumo.cidadeUrlSafe === cidadeNome.nomeUrlSafe
    )

    if(!resumoCidade){
        throw new Error(`Cidade ${nome}, não tem resumo pronto.`)
    }

    if(resumoCidade){
        return resumoCidade
    }


}


export async function criarResumoService(data, cidade, cidadeUrlSafe, resumo, apiCall) {
    if(!(data&&cidade&&cidadeUrlSafe&&resumo)){
        throw new Error("Os campo data, cidade, cidadeUrlSafe e resumo são necessarios!")
    }

    if(apiCall !== Object){
        apiCall = "Nao foi enviado!"
    }

    if(!((data.split("").length===10&&data[4]==="-"&&data[7]==="-")&&parseInt((data.slice(5,7))) > 0 && parseInt(data.slice(5,7)) < 13 && parseInt(data.slice(8,10)) > 0 && parseInt(data.slice(8,10)) < 32)){//verifica o formato da data
        throw new Error("Data precisa estar em formato ISO! Ex: 2020-05-30")
    }

    const isUrlSafe = /^[a-z0-9-]+$/.test(cidadeUrlSafe)

    if (!isUrlSafe) {
        throw new Error("cidadeUrlSafe não é válido para URL")
    }

    const resumoTotal = {
        data, 
        cidade, 
        cidadeUrlSafe, 
        resumo, 
        apiCall
    }

    return await resumoRepository.criar(resumoTotal)
}