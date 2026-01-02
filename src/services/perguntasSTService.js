import { initChatModel } from "langchain";
import { ChatOpenAI } from "@langchain/openai"
import { ChatPromptTemplate } from "@langchain/core/prompts";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


export async function responderPerguntasSTService(pergunta) {
    try{
        const prompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            `
            Você é um assistente de clima. Responda perguntas sobre termos meteriologicos.
            -Se a pergunta nao for sobre termos meteriologicos, diga que não é capaz.
            -Se nao souber fale que nao sabe.
            -Seja direto
            -Não faça mais de 1 paragrafo se nao for muito necessario
            -No maximo 3 paragrafos se for complicado.
            -Tente fazer um paragrafo em media.
            -Não tenha medo de citar numeros em casos simples.
            -Não tente complicar coisas simples
            `
        ],
        ["human", "{input}"]
        ]);



        const model = new ChatOpenAI({
            model: "gpt-4o-mini",
            temperature: 0,
            apiKey: process.env.OPENAI_API_KEY,
        })

        const agent = prompt.pipe(model)

        const response = await agent.invoke({input: pergunta});

        return response;
    }catch(error){
        next()
    }
}