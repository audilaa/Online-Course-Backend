module.exports = (app) => {
    const users = require('../controllers/login.controller')
    const router = require('express').Router()

    router.get('/', users.login)
    router.post('/', users.login)

    app.use('/api/login', router)
}