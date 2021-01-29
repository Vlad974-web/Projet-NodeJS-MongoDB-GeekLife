const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')


const app = express()

// Conection MongoDB
mongoose.connect('mongodb://localhost27017/geeklife', {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.static('public'))


// Handlebars ------------------------------------------------------
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs');


// Route
app.get('/', (req, res) => {
    res.render('index')
})

/* Route Contact */
app.get('/contact', (req, res) => {
    res.render('contact')
})












// Sur quel port functionnera application
const port = 3000
app.listen(port, () => {
    console.log(`ecoute Vlad, le port 3000, lancè à : ${new Date().toLocaleString()}, bon courage pour les codes!`);
})