import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import { responderPerguntasSTController } from "../controller/perguntasSTController.js"

const router = Router()

router.post("/", verificarSenha, responderPerguntasSTController)

export default router;