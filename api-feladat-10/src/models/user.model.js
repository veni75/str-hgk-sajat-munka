const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,    
}, {
    timeStamps: true
});

module.exports = mongoose.model('User', UserSchema);