module.exports = (req, res) => {

    if (req.session.userId) {
        
        return res.render('game/addIgri')
    }

    res.redirect('/user/login')
}