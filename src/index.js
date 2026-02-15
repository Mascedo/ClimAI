import path from "path";
import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import perguntasSTRoutes from "./routes/perguntasSTRoutes.js"
import cidadesRoutes from "./routes/cidadeService.js"
import resumoRoutes from "./routes/resumoRoutes.js"
import verificarSenhaRoutes from "./routes/verificarSenhaRoutes.js"
import { errorMiddleware } from "./middlewares/erroMiddleware.js"
dotenv.config({ path: path.resolve(".env") });



const app = express()
const port = process.env.PORT || 3000


mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use("/perguntas", perguntasSTRoutes)
app.use("/resumo", resumoRoutes)
app.use("/cidades", cidadesRoutes)
app.use("/verificarSenha", verificarSenhaRoutes)

app.use(errorMiddleware)

app.listen(port, () => {
    console.log("Aplicação rodando...")
})