const mongoose = require('mongoose')
//const nb = Math.round(nb*100)/100

const igriShema = new mongoose.Schema({

    title: String,
    categorie: String,
    prix: Number,
    image: String,
    description: String,
    date: String
})

module.exports = mongoose.model('Products', igriShema)