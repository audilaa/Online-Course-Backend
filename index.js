const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')

const port = 3000;

mongoose.connect('mongodb://127.0.0.1/auth')
    .then((result) => {
        console.log('connect to mongodb')
    }).catch((err) => {
        console.log(err)
    });

app.set('view engine', 'ejs')
app.set('views', './auth/views')

app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.use('/', require('./routes/user'))

app.listen(port, () => {
    console.log(`Server is running on port  http://localhost:${port}`)
})