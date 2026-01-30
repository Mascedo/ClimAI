import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import * as cidadeController from "../controller/cidadeController.js"

const router = Router()

router.get("/", verificarSenha, cidadeController.mostrarCidadeController)
router.post("/", verificarSenha, cidadeController.criarCidadeController)

export default router;