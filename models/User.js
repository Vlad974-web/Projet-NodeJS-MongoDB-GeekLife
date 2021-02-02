const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const userShema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Le prénom est oblgatoire']
    },
    firstName: {
        type: String,
        required: [true, 'Le nom est oblgatoire']
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est oblgatoire'],
        unique: true
    },
    confirmPassword: {
        type: String,
        required: [true, 'Le mot de passe est oblgatoire'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Le e-mail est oblgatoire'],
        unique: true
    },
    phone: Number,
    adress: {
        type: String,
        required: [true, "L'adresse est oblgatoire"]
    },
    postal: {
        type: String,
        required: [true, 'Le code postal est oblgatoire']
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