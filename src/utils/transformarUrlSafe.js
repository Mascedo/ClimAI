import slugify from "slugify"


export function transformarUrlSafe(nomeEntrada) {
        let nomeSaida = slugify(nomeEntrada, {
                                lower: true,
                                strict: true,
                            })
        return nomeSaida
}