import * as cidadeService from "../services/cidadeService.js";

export async function mostrarCidadeController(req, res, next) {
    try{
        const resposta = await cidadeService.mostrarCidadeService()
        res.status(200).json(resposta)
    }catch(error){
        next(error)
    }
}

export async function criarCidadeController(req, res, next) {
    try{
        const {nome, latitude, longitude} = req.body

        const resposta = await cidadeService.criarCidadeService(nome, latitude, longitude)
        res.status(200).json(resposta)
    }catch(error){
        next(error)
    }
}

