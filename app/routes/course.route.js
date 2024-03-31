module.exports = (app) => {
    const courses = require('../controllers/course.controller.js')
    const router = require('express').Router()

    router.get('/', courses.findAll)

    app.use('/api/courses', router)
}