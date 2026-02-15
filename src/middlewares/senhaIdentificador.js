import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


function horario(ds){
    if(ds === 1){
        const now = new Date().toLocaleString('en-US', {timeZone: 'America/Sao_Paulo'})
        const partes = now.split("/")
        
        if(partes[0]<10){// faz que quando for um numero menor que 10 adiciona zero a esquerda, para se adequar a ISO. Exemplo: 3 => 03
            partes[0] = "0"+partes[0]
        }

        if(partes[1]<10){// faz que quando for um numero menor que 10 adiciona zero a esquerda, para se adequar a ISO. Exemplo: 3 => 03
            partes[1] = "0"+partes[1]
        }

        const resultado = partes[2].slice(0, 4) + "-" + partes[0] + "-" + partes[1]
        return resultado
    }else{
        return "use 1 para a função"
    } 
}

async function criarSenha() {
    const dia = horario(1)
    const senha = await crypto.createHmac('sha256', process.env.PEPPER).update(dia).digest('hex');
    return senha
}


export async function verificarSenha(req, res, next) {//reinicia o contador de tentavivas se ja tiver passado um dia
    try{ 
        const { senha } = req.headers

        
        if(await criarSenha() === senha && senha !== undefined){
            return next()
        }else{
            return res.status(401).json({ erro: `Senha incorreta.`});
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


//console.log(await verificarSenha({body:{senha:"7ed796e9701bb430ddca0472fa6a93d92e0befa83a7c58ae85c1cc9990895672"}}), await criarSenha(), tentativas)