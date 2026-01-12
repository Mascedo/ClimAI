import path from "path";
import express from "express";
import dotenv from "dotenv";
import perguntasSTRoutes from "./routes/perguntasSTRoutes.js"
import resumoRoutes from "./routes/resumoRoutes.js"
dotenv.config({ path: path.resolve(".env") });

const app = express()
const port = process.env.PORT || 3000


//mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use("/perguntas", perguntasSTRoutes)
app.use("/resumo", resumoRoutes)



app.listen(port, () => {
    console.log("Aplicação rodando...")
})