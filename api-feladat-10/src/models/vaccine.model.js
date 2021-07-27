const mongoose = require('mongoose');

const VaccineSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    efficiency: Number
}, {
    timeStamps: true
});

module.exports = mongoose.model('Vaccine', VaccineSchema);