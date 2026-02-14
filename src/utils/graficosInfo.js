import axios from "axios"
import { tool } from "langchain"
import { z } from "zod"
import { dataResumo } from "./data.js";

export async function chamarOpenMeteograficoInfo(latitude, longitude, data){
   const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunset,sunrise&hourly=temperature_2m,precipitation,apparent_temperature&timezone=auto&start_date=${data}&end_date=${data}`
//data no formato AAAA-MM-DD e latitude é com - ou +.

    try {
        const response = await axios.get(url);

        let temperaturas = response.data.hourly.temperature_2m

        let temperaturasAparentes = response.data.hourly.apparent_temperature

        let precipitacoes = response.data.hourly.precipitation

        let minTemp = 100

        let maxTemp = -100

        temperaturas.forEach(temperatura => {
            if(temperatura < minTemp){
                minTemp = temperatura
            }
        });

        temperaturas.forEach(temperatura => {
            if(temperatura > maxTemp){
                maxTemp = temperatura
            }
        });

        const minMaxTemp = minTemp + "/" + maxTemp

        return [minMaxTemp, temperaturas, temperaturasAparentes, precipitacoes]

    } catch (error) {
        console.error("Erro ao chamar a API:", error.message);
        throw new Error("Falha ao obter dados do clima");
    }
}

//console.log(await chamarOpenMeteograficoInfo(-10.852266690856467, -37.12749042510635, "2026-02-14"))