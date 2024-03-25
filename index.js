const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const session = require('express-session')
const User = require('./auth/models/user')

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

const auth = (req, res, next ) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next()
}

const authenticated = (req, res, next ) => {
    if (!req.session.user_id) {
        next()
    }
    return res.redirect('/admin')
}

app.get('/', (req, res) => {
    res.send('homepage')
})

app.get('/login', authenticated, (req, res) => {
    res.render('login')
})

app.post('/login',async (req, res) => {
    const { username, password } = req.body
    const user = await User.findByCredentials( username, password )
    if (user) {
        req.session.user_id = user._id
        res.redirect('/admin')
    } else {
        res.redirect('/login')
    }
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register',async (req, res) => {
    const { username, phonenumber, password } = req.body
    const user = new User({ username, phonenumber, password })
    await user.save()
    req.session.user_id = user._id
    res.redirect('/')
})

app.post('/logout',auth, (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

app.get('/admin',auth , (req, res) => {
    res.render('admin')
})

app.get('/profile/settings', auth, (req, res) => {
    res.send('profile settings: ' + req.session.user_id)
})

app.listen(3000, () => {
    console.log('Server is running on port  http://localhost:3000')
})

