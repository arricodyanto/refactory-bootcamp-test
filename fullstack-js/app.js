require('./auth')
require('./utils/db')

const userModel = require('./utils/users')

const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport')
const cookieSession = require('cookie-session');

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
    name: 'skilltest-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401)
    }
}

app.use(passport.initialize());
app.use(passport.session());


// Root routes (login)
app.get('/', (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layout',
        title: 'Login Page'
    })
})

// Checking email and pass from form page that matching in db or not
app.post('/', async(req, res) => {
    var emailuser = req.body.email
    var passuser = req.body.pass

    const users = await userModel.findOne({ email: emailuser })
    if (users) {
        const cek = JSON.parse(users.pass)
        if (cek == passuser) {
            res.send(users)
        } else {
            res.send('Password tidak cocok')
        }
    }
    if (!users) {
        res.send('Akun anda belum terdaftar! Silakan mendaftar melalui akun Google Anda')
    }

})

// Cheking user (if doesn't exitst = adding to db, if it does = redirect to dashboard)
app.get('/checkuser', isLoggedIn, async(req, res) => {
    var idguser = req.user.id

    const users = await userModel.findOne({ id: idguser })
    if (users) {
        const cek = JSON.parse(users.id)
        if (cek == idguser) {
            res.redirect('/dashboard')
        }
    }
    if (!users) {
        res.redirect('/users/add')
    }

})

// Dashboard routes
app.get('/dashboard', isLoggedIn, async(req, res) => {
    var idgname = req.user.displayName

    const users = await userModel.find()

    res.render('signed', {
        layout: 'layouts/main-layout',
        title: 'Get Users',
        users,
        idgname
    })
})

// Get all user data 
app.get('/getusers', (req, res) => {
    userModel.find().then((user) => {
        res.send(user)
    })
})

// Add user data to db
app.post('/users', (req, res) => {
    userModel.insertMany(req.body, (error, result) => {
        res.redirect('/dashboard')
    })
})

// Add password to user account
app.get('/users/add', isLoggedIn, (req, res) => {
    idguser = req.user.id
    nameguser = req.user.displayName
    emailguser = req.user.emails[0].value
    res.render('adduser', {
        layout: 'layouts/main-layout',
        title: 'Complete your profile to continue - alakadarnya',
        idguser,
        nameguser,
        emailguser
    })
})

// Send data if err
app.get('/failed', (req, res) => {
    res.send('Failed to login!')
})

// Google Login Route
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)


// Google Callback (if Err)
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed'
    }),

    function(req, res) {
        res.redirect('/checkuser')
    }
);

// Logout Route
app.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

// Listening to port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})