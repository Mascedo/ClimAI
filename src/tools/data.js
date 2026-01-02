import { tool } from "langchain"
import { z } from "zod"


function dataHora() {//vai retornar a data e hora em uma string no gtm -3
    const now = new Date().toLocaleString('en-US', {timeZone: 'America/Sao_Paulo'})
    const partes = now.split("/")
    const resultado = partes[1] + "/" + partes[0] + "/" + partes[2]
    return resultado
}

export const dataHoraTool = tool(
    () => {
        return dataHora()
    },
    {
        name: "dataHora",
        description: "mostra o horario e data atual no formato dd/mm/aaaa, hh/mm am/pm(no Brasil gtm -3). Nao precisa de entrada so pedir e ela retorna.",
        schema: z.object({})
    }
)