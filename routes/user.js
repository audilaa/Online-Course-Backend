const express = require('express')
const router = express.Router()

const User = require('./../auth/models/user')

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

router.get('/', (req, res) => {
    res.send('homepage')
})

router.get('/login', authenticated, (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/admin',auth , (req, res) => {
    res.render('admin')
})

router.get('/profile/settings', auth, (req, res) => {
    res.send('profile settings: ' + req.session.user_id)
})

router.post('/login',async (req, res) => {
    const { username, password } = req.body
    const user = await User.findByCredentials( username, password )
    if (user) {
        req.session.user_id = user._id
        res.redirect('/admin')
    } else {
        res.redirect('/login')
    }
})

router.post('/register',async (req, res) => {
    const { username, phonenumber, password } = req.body
    const user = new User({ username, phonenumber, password })
    await user.save()
    req.session.user_id = user._id
    res.redirect('/')
})

router.post('/logout',auth, (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

module .exports = router