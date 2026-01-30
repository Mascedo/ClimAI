import { resumoService } from "../services/resumoService.js";

export async function resumoController(req, res, next) {
    try{
        const { cidade } = req.query

        const resposta = await resumoService(cidade)

        res.status(200).json(resposta)

    }catch(error){
        next(error)
    }
}

