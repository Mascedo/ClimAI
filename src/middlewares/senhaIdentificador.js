import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });


function horario(ds){//dsm significa dia e semana. Representados respectivamentes por 1 e 2. Decide oque vai sair.
    if(ds === 1){
        const now = new Date().toLocaleString('en-US', {timeZone: 'America/Sao_Paulo'})
        const partes = [now.slice(0,3), now.slice(3,6), now.slice(6,10)]//divide a data em sessões
        const resultado = partes[1]+partes[0]+partes[2]//transforma 12/20/2025 para 20/12/2025
        return resultado
    }else if(ds === 2){
        return "não fiz ainda"//eu vou fazer ainda.
    }else{
        return "use 1 ou 2 para a função"
    } 
}

async function criarSenha() {
    const dia = horario(1)
    const senha = await crypto.createHmac('sha256', process.env.PEPPER).update(dia).digest('hex');
    return senha
}

let tentativas = [horario(1), 0]//contador de tentaviva com horario

export async function verificarSenha(req, res, next) {//reinicia o contador de tentavivas se ja tiver passado um dia
    try{ 
        const { senha } = req.body

        if(tentativas[0] !== horario(1)){
            tentativas[1] = 0
            tentativas[0] = horario(1)
        }

        if(tentativas[1]>4){console.log("sim");process.exit(0)}//mata o progama caso passe do limite de tentativas
        
        if(await criarSenha() === senha){
            return next()
        }else{
            tentativas[1]++
            return res.status(401).json({ erro: `Senha incorreta. Tentativas: ${tentativas[1]} de 5`});
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


//console.log(await verificarSenha({body:{senha:"7ed796e9701bb430ddca0472fa6a93d92e0befa83a7c58ae85c1cc9990895672"}}), await criarSenha(), tentativas)