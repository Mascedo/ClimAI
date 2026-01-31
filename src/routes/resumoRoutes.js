import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import * as resumoController from "../controller/resumoController.js"

const router = Router()

router.get("/", verificarSenha, resumoController.resumoController)
router.post("/", verificarSenha, resumoController.criarResumoService )

export default router;