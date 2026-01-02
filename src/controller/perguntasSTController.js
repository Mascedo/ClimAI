import { responderPerguntasSTService } from "../services/perguntasSTService.js";

export async function responderPerguntasSTController(req, res) {
    try{
        const { pergunta } = req.body

        const resposta = await responderPerguntasSTService(pergunta)

        res.status(200).json(resposta)

    }catch(error){
        next(error)
    }
}

