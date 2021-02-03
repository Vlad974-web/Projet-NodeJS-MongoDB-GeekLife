module.exports = (req, res) => {

    res.render('register', {

        data: req.flash('data')[0]
    })
}

// data nous permets de renvoyer les données de l'utilasateurs, et si il a fait une faute, il n'avait pas besoin de taper ce qu'il a déjà remplir
// [0] je sais que c'est un objet, donc on passe l'information autant objet.