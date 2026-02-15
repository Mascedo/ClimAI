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

        let horarios = ["00h","01h","02h","03h","04h","05h","06h","07h","08h","09h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h","21h","22h","23h"]


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

        const minMaxTemp = minTemp + "°C / " + maxTemp + "°C"

        return [minMaxTemp, temperaturas, temperaturasAparentes, precipitacoes, horarios]

    } catch (error) {
        console.error("Erro ao chamar a API:", error.message);
        throw new Error("Falha ao obter dados do clima");
    }
}

//console.log(await chamarOpenMeteograficoInfo(-10.852266690856467, -37.12749042510635, "2026-02-14"))