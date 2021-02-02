const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {

    const {email, password} = req.body
    User.findOne({email}, (err, user) => {

        if (user) {

            bcrypt.compare(password, user.password, (err, code) => {

                if (code) {

                    res.redirect('/')
                } else {
                    
                    res.redirect('/user/login')
                }
            })
        } else {

            return res.redirect('/user/login')
        }
    })
}