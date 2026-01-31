import mongoose from 'mongoose';

const Resumo = mongoose.model('Resumo', {
    data: String,
    longitude: Number,
    latitude: Number,
    resumo: String,
    apiCall: Object
})

export default Resumo