require('./auth')

const fs = require('fs')
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const queryString = require('query-string');
const passport = require('passport')
const cookieSession = require('cookie-session')

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

app.get('/', (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layout',
        title: 'Login Page'
    })
})
app.get('/good', isLoggedIn, (req, res) => {
    var displayName = req.user.displayName

    res.render('signed', {
        layout: 'layouts/main-layout',
        title: 'Logged In',
        displayName
    })
})
app.get('/failed', (req, res) => {
    res.send('Failed to login!')
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed'
    }),

    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good')
    }
);

app.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})