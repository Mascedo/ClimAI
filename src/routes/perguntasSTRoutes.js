import { Router } from "express"
import { verificarSuperSenha } from "../middlewares/superSenhaIdentificador.js";
import { responderPerguntasSTController } from "../controller/perguntasSTController.js"

const router = Router()

router.post("/", verificarSuperSenha, responderPerguntasSTController)

export default router;