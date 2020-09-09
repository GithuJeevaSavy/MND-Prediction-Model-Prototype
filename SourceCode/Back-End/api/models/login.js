const mongoose = require('mongoose');
const ScoringRegister = require('./ScoringRegister');

const LoginSchema = mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('LoginRegister', LoginSchema);