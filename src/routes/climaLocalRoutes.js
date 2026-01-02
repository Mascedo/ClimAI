import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import { climaLocalController } from "../controller/climaLocalController.js"

const router = Router()

router.post("/", verificarSenha, climaLocalController)

export default router;