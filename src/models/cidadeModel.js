import mongoose from 'mongoose';

const Cidade = mongoose.model('Cidade', {
    nome: {
        type: String,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
})

export default Cidade