import { verificarSenhaService } from "../services/verificarSenhaService.js"

export async function verificarSenhaController(req, res, next) {
    try{
        const resposta = await verificarSenhaService()

        res.status(200).json(resposta)
    }catch(error){
        next(error)
    }
}
