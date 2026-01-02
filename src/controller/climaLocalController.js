import { climaLocalService } from "../services/climaLocalService.js";

export async function climaLocalController(req, res) {
    try{
        const { cidade } = req.body

        const resposta = await climaLocalService(cidade)

        res.status(200).json(resposta)

    }catch(error){
        next(error)
    }
}

