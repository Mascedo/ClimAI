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

const senhas = process.env.SUPERSENHAPEPPER

const superSenhaPepper = senhas.split(",")[0]

const superSenhaPublicaPepper = senhas.split(",")[1]

async function criarSuperSenhaPublica() {
    const dia = horario(1)
    const senha = await crypto.createHmac('sha256', superSenhaPublicaPepper).update(dia).digest('hex');
    return senha
}

async function criarSuperSenha() {
    const dia = horario(1)
    const senha = await crypto.createHmac('sha256', superSenhaPepper).update(dia).digest('hex');
    return senha
}



let requests = [horario(1), 0]//contador de quantas request foram feitas

export async function verificarSuperSenha(req, res, next) {//reinicia o contador de tentavivas se ja tiver passado um dia
    try{ 
        const { senha } = req.headers

        if(requests[0] !== horario(1)){//reseta quando passa o dia
            requests[1] = 0
            requests[0] = horario(1)
        }
        
        if(await criarSuperSenha() === senha && senha !== undefined){
            return next()
        }else if((await criarSuperSenhaPublica() === senha && senha !== undefined)){
            if(requests[1]<10){
                requests[1]++
                return next()
            }else{
                return res.status(401).json({ erro: `Super senha publica exedeu os limites de uso.`});           
            }
        }else{
            return res.status(401).json({ erro: `Super senha incorreta.`});
        }

    }catch(error){
        console.error(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


//console.log(horario(1))