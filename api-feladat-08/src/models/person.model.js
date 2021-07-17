const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    vaccine: {
        vaccine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vaccine'
        },
        count: Number
    }
}, {
    timeStamps: true
});

module.exports = mongoose.model('Person', PersonSchema);