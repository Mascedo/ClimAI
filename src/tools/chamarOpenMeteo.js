import axios from "axios"
import { tool } from "langchain"
import { z } from "zod"

export async function chamarOpenMeteo(latitude, longitude, data){
   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunset,sunrise&hourly=temperature_2m,precipitation,apparent_temperature&timezone=auto&start_date=${data}&end_date=${data}`


    try {
        const response = await axios.get(url);

        function formatarRespostaDiaria(data){//deixa a resposta mais legivel pa a IA
            var resposta = {
              "fuso_horario": data.timezone_abbreviation, 
              "nascer_e_por_do_sol": ["nascer do sol: " + data.daily.sunrise[0], 
              "por do sol: " + data.daily.sunset[0]],"hora_em_hora": {}
            }
            let index = 0
            for (let hora of data.hourly.time){//faz a hora em hora do objeto 
                let horaResponse = "temperatura_°C: " + data.hourly.temperature_2m[index] + ", precipitação_mm: " + data.hourly.precipitation[index] + ", temperatura_aparente_°C: " + data.hourly.apparent_temperature[index]
                resposta.hora_em_hora[hora] = horaResponse
                index++
            }
            return resposta
        }


        return formatarRespostaDiaria(response.data)

    } catch (error) {
        console.error("Erro ao chamar a API:", error.message);
        throw new Error("Falha ao obter dados do clima");
    }
}

export const chamarOpenMeteoTool = tool(
  ({ latitude, longitude, data }) => {
    return chamarOpenMeteo(latitude, longitude, data);
  },
  {
    name: "climaOpenMeteo",
    description: "Mostra previsão do tempo diária e hora a hora (temperatura, precipitação e nascer/pôr do sol) para uma data específica.",
    schema: z.object({
      latitude: z.number().describe("Latitude da localização"),
      longitude: z.number().describe("Longitude da localização"),
      data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Data no formato YYYY-MM-DD"),
    }),
  }
);

//console.log(await chamarOpenMeteo(-10.5075, -39.0158, "2026-01-03"))