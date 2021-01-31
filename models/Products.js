const mongoose = require('mongoose')


const igriShema = new mongoose.Schema({

    title: String,
    categorie: String,
    prix: Number,
    image: String,
    description: String,
    createDate: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('product', igriShema)