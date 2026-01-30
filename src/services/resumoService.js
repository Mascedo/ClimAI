import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


export async function resumoService(cidade) {
    try{
        if(!(cidades.incluides(cidade))){
            throw new Error(`A cidade ${cidade} não esta incluida no banco de dados!`)
        }
    }catch(error){
        next()
    }
}