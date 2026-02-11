import path from "path";
import dotenv from "dotenv";
import { createAgent } from "langchain"
import { ChatOpenAI } from "@langchain/openai";
import { dataResumo } from "./data.js";
import { chamarOpenMeteo } from "./chamarOpenMeteo.js";
dotenv.config({ path: path.resolve("../.env") });


export async function resumirClimaIA(latitude, longitude, data){
    if(!data){//caso data não seja enviada ele pega a data atual.
        data = dataResumo()
    }

    const climaDia = await chamarOpenMeteo(latitude, longitude, data)

    const agent = createAgent({
        model: new ChatOpenAI({ 
            model: "gpt-4.1-mini",
            temperature: 0
        }),
        systemMessage: `
            Você é um assistente de clima. Deve fazer resumos de um paragrafo sem usar "-", seja breve. User menos de 40 palavras.

            REGRAS OBRIGATÓRIAS:
            - Responda com APENAS um parágrafo
            - NÃO use cabeçalho
            - NÃO cite nascer do sol, pôr do sol ou fuso horário
            - NÃO use listas ou tópicos
            - NÃO explique o que está fazendo
            - NÃO repita os dados recebidos
            - SEMPRE inclua um conselho no final (roupa ou cuidados)
            - SEMPRE começe o resumo com: "Durante o dia" 
            - NUNCA mencione datas, dias do mês ou expressões como "no dia", "neste dia", "hoje" ou similares
            - O texto deve ser atemporal, como uma conversa casual sobre o clima
        `

    
    });

    const result = await agent.invoke(
    {
        messages: [
            { 
                role: "user", 
                content: `
            Resumo do clima do dia: 
            ${JSON.stringify(climaDia.hora_em_hora, null, 2) }
            `
            }
        ]
    });

    let resultado = result.messages[result.messages.length -1].content

    const resultadoCurto = resultado.split(/\n\s*\n/)[result.messages.length]//pega somente o ultimo paragrafo que é onde esta o resumo

    return [resultadoCurto, resultado, climaDia]
    
}

//console.log(await resumirClimaIA(-10.852266690856467, -37.12749042510635)) //exemplo cidade: "nossa senhora do socorro", data: A atual