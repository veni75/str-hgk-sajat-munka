const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: String,
    password: String,
    role: String,    
}, {
    timeStamps: true
});

module.exports = mongoose.model('User', UserSchema);