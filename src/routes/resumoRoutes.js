import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import { resumoController } from "../controller/resumoController.js"

const router = Router()

router.post("/", verificarSenha, resumoController)

export default router;