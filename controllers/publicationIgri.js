const Igri = require('../models/Products')
const path = require('path')

module.exports = (req, res) => {
    
    const {image} = req.files
    const uploadFile = path.resolve(__dirname, '..', 'public/image', image.name)

    image.mv(uploadFile, (err) => {

        Igri.create(
            {
                ...req.body,
                image: `/image/${image.name}`
            }
            , (err, post) => {
    
                res.redirect('/')
            })
    })
}