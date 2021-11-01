require('./auth')
require('./utils/db')

const userModel = require('./utils/users')
    // require('./conn')

// const { loadUsers, saveUser, addUser, findID } = require('./utils/userMan')

const fs = require('fs')
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const queryString = require('query-string');
const passport = require('passport')
const cookieSession = require('cookie-session');
const { time } = require('console');
const { title } = require('process');

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

// db connection
// const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'skilltest',
//     user: 'postgres',
//     password: 'password',
// })

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

app.get('/checkuser', isLoggedIn, async(req, res) => {
    var idguser = req.user.id

    const users = await userModel.findOne({ id: req.user.id })
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

app.get('/getusers', (req, res) => {

    userModel.find().then((user) => {
        res.send(user)
    })

})

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
        // console.log('add')
})

app.post('/users', (req, res) => {
    userModel.insertMany(req.body, (error, result) => {
            res.redirect('/dashboard')
        })
        // userDetails.save().then((userModel) => {
        //     res.redirect('/dashboard')
        // })
        // Menambahkan 1 data
        // const user1 = new userModel({
        //     id: '123131',
        //     nama: 'Arrrico',
        //     email: 'arricohandyanto@gmail.com',
        //     pass: '12345'
        // })

    // user1.save().then((userModel) => console.log(userModel))
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
        res.redirect('/checkuser')
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