import Resumo from '../models/resumoModel.js'


class resumoRepository {
    async mostrar(){
        return await Resumo.find()
    }

    async criar(resumo){
        return  await Resumo.create(resumo)
    }

    async deletar(id){
        return await Resumo.findByIdAndDelete(id)
    }
}

export default new resumoRepository();