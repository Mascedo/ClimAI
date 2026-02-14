import mongoose from 'mongoose';

const Resumo = mongoose.model('Resumo', {
    data: String,//formato: AAAA-MM-DD
    cidade: String,
    cidadeUrlSafe: String,
    resumo: String,
    apiCall: Object,
    maxMinTemp: String
})

export default Resumo