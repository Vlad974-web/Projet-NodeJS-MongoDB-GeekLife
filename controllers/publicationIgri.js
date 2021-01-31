const Igri = require('../models/Products')
//const path = require('path')

module.exports = (req, res) => {

    Igri.create(req.body, (err, post) => {

        res.redirect('/')

    })
    
}