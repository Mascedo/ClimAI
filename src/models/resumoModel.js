import mongoose from 'mongoose';

const Resumo = mongoose.model('Resumo', {
    data: String,
    cidade: String,
    cidadeUrlSafe: String,
    resumo: String,
    apiCall: Object
})

export default Resumo