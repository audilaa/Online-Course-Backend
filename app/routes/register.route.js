module.exports = (app) => {
    const users = require('../controllers/register.controller')
    const router = require('express').Router()

    router.post('/', users.create)

    app.use('/api/register', router)
}