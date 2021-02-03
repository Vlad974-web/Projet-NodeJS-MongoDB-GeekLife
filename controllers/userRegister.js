const User = require('../models/User')

module.exports = (req, res) => {

    User.create(req.body, (err, user) => {

        if (err) {

            req.flash('data', req.body)                 // req.body, elle va tout récupérer ce que l'utilasateur a saisir

            return res.redirect('/add/user')
        }

        res.redirect('/')
    })
}