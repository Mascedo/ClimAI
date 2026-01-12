import { resumoService } from "../services/resumoService.js";

export async function resumoController(req, res) {
    try{
        const { cidade } = req.body

        const resposta = await resumoService(cidade)

        res.status(200).json(resposta)

    }catch(error){
        next(error)
    }
}

