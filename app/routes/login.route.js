module.exports = (app) => {
    const users = require('../controllers/login.controller')
    const router = require('express').Router()

    router.get('/', users.loginUser)

    app.use('/api/login', router)
}