module.exports = (app) => {
    const courses = require('../controllers/course.controller.js')
    const router = require('express').Router()
    const authentication = require('../middleware/authenticationToken')

    router.get('/', courses.findAll)

    app.use('/api/courses', authentication.authenticationToken , router)
}