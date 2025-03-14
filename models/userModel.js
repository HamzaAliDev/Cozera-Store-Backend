const moongose = require('mongoose');

const userSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        default: ['user']
    },
    status: {
        type: String,
        default: 'active'
    }

}, { timestamps: true });

const User = moongose.model('User', userSchema);
module.exports = User;