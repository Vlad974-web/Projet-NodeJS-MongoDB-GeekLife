const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require("handlebars")
const path = require('path')
const fileupload = require('express-fileupload')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')



const app = express()

// Conection MongoDB
mongoose.connect('mongodb://localhost:27017/geeklife', {useNewUrlParser: true, useUnifiedTopology: true})
.then(response => {
    console.log("MongoDB est connecté.");
}).catch(err => {
    console.log("échec de la connexion à la base de données.");
});

/* ==================== BodyParser ==================== */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


/* Express-FileUpload */
app.use(fileupload())


// Handlebars ==========================================================================================================
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('view engine', 'hbs');


/* ========================= Middleware ========================= */
const articlePostMiddl = require('./middleware/articlePostMiddl')
app.use('/publication/igri', articlePostMiddl)

const connexion = require('./middleware/connexion')
//app.use('/game/addIgri', connexion)


/* ========== Express-Session et Connect-Mongo ========== */
const mongoStore = MongoStore(expressSession)

app.use(expressSession({
    secret: 'Securité',
    name: 'boobs',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))


/* ========== Connect-Flash ========== */
app.use(flash())






/*  ============================================ Controllers hbs ================================================================ */

// index.hbs --------------------------------------
const homePage = require('./controllers/homePage')
// Contact.hbs 
const contactPageController = require('./controllers/contactPage')
// addIgri.hbs
const addIgriController = require('./controllers/addIgri')
// Post Publigation Igri
const publicationIgri = require('./controllers/publicationIgri')
// Description Of The Article
const descriptionIgri = require('./controllers/descriptionIgri')
/* ======================================================== Toutes les routes hbs ================================================= */
// Route index.hbs
app.get('/', homePage)
/* Route contact.hbs */
app.get('/contact', contactPageController)
/* Route addIgri.hbs */
app.get('/game/addIgri', connexion, addIgriController)
app.post('/publication/igri', connexion, articlePostMiddl, publicationIgri)
// Route description.hbs
app.get('/description/:id', descriptionIgri)





/* ==================================================== User Controllers ========================================================= */
const addUser = require('./controllers/addUser')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
/* ====================================================== Toutes les routes User ================================================= */
// Route register.hbs -------------------
app.get('/add/user', addUser)
app.post('/user/register', userRegister)

// Route login.hbs
app.get('/user/login', userLogin)
app.post('/user/loginAuth', userLoginAuth)








// Sur quel port functionnera application
const port = 3000
app.listen(port, () => {
    console.log(`ecoute Vlad, le port 3000, lancè à : ${new Date().toLocaleString()}, bon courage pour les codes!`);
})