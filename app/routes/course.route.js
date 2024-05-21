module.exports = (app) => {
    const courses = require('../controllers/course.controller.js')
    const router = require('express').Router()
    const authentication = require('../middleware/authenticationToken')
    
    router.post('/', courses.createCourse)
    router.get('/', courses.findAllCourse)
    router.get('/:id', courses.findByIdCourse)
    router.put('/:id', courses.updateCourse)
    router.delete('/:id', courses.deleteCourse)

    app.use('/api/courses', router)
}