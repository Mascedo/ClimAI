import Cidade from '../models/cidadeModel.js'


class cidadeRepository {
    async mostrar(){
        return await Cidade.find()
    }

    async criar(cidade){
        return  await Cidade.create(cidade)
    }

    async deletar(id){
        return await Cidade.findByIdAndDelete(id)
    }
    }

export default new cidadeRepository();