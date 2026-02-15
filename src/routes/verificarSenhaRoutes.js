import { Router } from "express"
import { verificarSenha } from "../middlewares/senhaIdentificador.js";
import { verificarSenhaController } from "../controller/verificarSenhaController.js";

const router = Router()

router.get("/", verificarSenha, verificarSenhaController)

export default router;