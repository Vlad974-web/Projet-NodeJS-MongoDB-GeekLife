const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const userShema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmPassword: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: Number,
    adress: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    }
})


userShema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, (err, encrypted) => {

        user.password = encrypted
        next()
    })
})


module.exports = mongoose.model('User', userShema)