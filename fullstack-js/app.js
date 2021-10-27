const data = require('./data/data.json')
const express = require('express')
const expressLayouts = require('express-ejs-layouts');

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('login', {
        layout: 'layouts/main-layout',
        title: 'Login Page - Alakadarnya'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})