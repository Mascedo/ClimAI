import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import { resumoController } from "../controller/resumoController.js"

const router = Router()

router.get("/", verificarSenha, resumoController)

export default router;