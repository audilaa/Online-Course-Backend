module.exports = (app) => {
    const courses = require('../controllers/course.controller.js')
    const router = require('express').Router()

    // router.post('/', courses.create)
    router.get('/', courses.findAll)
    // router.get('/:id', courses.findOne)
    // router.put('/:id', courses.update)
    // router.delete('/:id', courses.delete)
    // router.delete('/', courses.deleteAll)
    // app.use('/api/courses', router)

    app.use('/api/courses', router)
}