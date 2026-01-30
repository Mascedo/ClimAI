const mongoose = require('mongoose');

const Resumo = mongoose.model('Resumo', {
    data: String,
    longitude: String,
    latitude: String,
    resumo: String,
    apiCall: Object
})

module.exports = Resumo