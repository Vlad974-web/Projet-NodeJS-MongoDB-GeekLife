const Igri = require('../models/Products')

module.exports = ('/', async (req, res) => {             // async - il va synchroniser avec ces bases do donées

    const posts = await Igri.find({}).lean()
    
    res.render('index', {posts})
})