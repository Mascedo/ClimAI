import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


export async function verificarSenhaService() {
    return "Senha correta"
}
