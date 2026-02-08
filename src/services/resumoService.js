import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";
import * as cidadeService from "./cidadeService.js";
import dotenv from "dotenv";
import resumoRepository from "../repositories/resumoRepository.js"
import { dataResumo } from "../utils/data.js";
dotenv.config({ path: path.resolve("../.env") });


export async function resumoService(nome) { // essa parte tem muito comentario e é confusa. Boa sorte🍀
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

    const cidadeNome = cidades.find(             //busca o nome da cidade na lista de cidade
        cidade => cidade.nomeUrlSafe === nome.toLowerCase()
    )

    const resumoCidade = resumos.filter(                        // verifica se cidade existe e busca os resumos da cidade nos resumos
        resumo => resumo.cidadeUrlSafe === cidadeNome.nomeUrlSafe
    )

    const resumoCidadeData = resumoCidade.filter(               // verifica se os resumos da cidade tem algum com a data atual
        resumosData => resumosData.data === dataResumo()
    )

    if(!resumoCidade[0]){//busca o primeiro index para ver se essa cidade tem algum resumo
        throw new Error(`Cidade ${nome}, não tem resumo pronto.`)
    }

    if(!resumoCidadeData[0]){//ver se tem algum resumo com memsma data e cidade. Se for undefined é pq nao tem e da o erro.
        throw new Error(`Cidade ${nome}, não tem resumo pronto para hoje.`)
    }

    if(resumoCidadeData[0].data === dataResumo()){//verifica se é a mesma data. É redundante eu sei, mas fica bonito e mais legivel assim.
        return resumoCidadeData
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