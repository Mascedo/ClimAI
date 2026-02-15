import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import { verificarSuperSenha } from "../middlewares/superSenhaIdentificador.js";
import * as resumoController from "../controller/resumoController.js"

const router = Router()

router.get("/", verificarSenha, resumoController.resumoController)
router.post("/", verificarSuperSenha, resumoController.criarResumoService )

export default router;