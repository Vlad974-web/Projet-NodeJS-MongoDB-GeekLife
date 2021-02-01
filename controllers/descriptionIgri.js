const Igri = require('../models/Products')

module.exports = async (req, res) => {
    
    const article = await Igri.findById(req.params.id)
    
    res.render('description', {article})
}