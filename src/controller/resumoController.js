import * as resumoService  from "../services/resumoService.js";

export async function resumoController(req, res, next) {
    try{
        const { cidade } = req.query

        const resposta = await resumoService.resumoService(cidade)

        res.status(200).json(resposta)

    }catch(error){
        next(error)
    }
}

export async function criarResumoService(req, res, next) {
    try{
        const {data, longitude, latitude, resumo, apiCall} = req.body

        const resposta = await resumoService.criarResumoService(data, longitude, latitude, resumo, apiCall)
        res.status(200).json(resposta)
    }catch(error){
        next(error)
    }
}

