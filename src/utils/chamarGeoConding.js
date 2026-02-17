import axios from "axios"
import { transformarUrlSafe } from "./transformarUrlSafe.js"

export async function chamarGeoConding(pesquisa){
   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${pesquisa}&count=10&language=pt&format=json`


    try {
        if(typeof pesquisa !== "string"){//verifica se é string
            throw new Error("Pesquisa precisa ser string.")
        }
        const response = await axios.get(url)

        const lista = response.data.results //pega somente a resposta

        let listaBrasil = []

        lista.forEach(cidade => {
            if(cidade.country === "Brasil"){
                listaBrasil.push({
                    "nome": cidade.name,
                    "nomeUrlSafe": transformarUrlSafe(cidade.name),
                    "latitude": cidade.latitude,
                    "longitude": cidade.longitude
                })
            }
        });

        return listaBrasil

    } catch (error) {
        console.error("Erro ao chamar a API:", error.message);
        throw new Error("Falha ao obter dados do geoConding");
    }
}

//console.log(await chamarGeoConding("salvado"))