const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require("handlebars")
const path = require('path')




const app = express()

// Conection MongoDB
mongoose.connect('mongodb://localhost:27017/geeklife', {useNewUrlParser: true, useUnifiedTopology: true})
.then(response => {
    console.log("MongoDB est connecté.");
}).catch(err => {
    console.log("échec de la connexion à la base de données.");
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


// Handlebars ==========================================================================================================
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('view engine', 'hbs');





/*  ============================================ Controllers hbs ================================================== */

// index.hbs --------------------------------------
const homePage = require('./controllers/homePage')
// Contact.hbs 
const contactPageController = require('./controllers/contactPage')
// addIgri.hbs
const addIgriController = require('./controllers/addIgri')
// Post Publigation Igri
const publicationIgri = require('./controllers/publicationIgri')


/* ======================================================== Toutes les routes hbs ================================================= */
// Route index.hbs
app.get('/', homePage)
/* Route contact.hbs */
app.get('/contact', contactPageController)
/* Route addIgri.hbs */
app.get('/addIgri', addIgriController)
app.post('/publication/igri', publicationIgri)





// Sur quel port functionnera application
const port = 3000
app.listen(port, () => {
    console.log(`ecoute Vlad, le port 3000, lancè à : ${new Date().toLocaleString()}, bon courage pour les codes!`);
})