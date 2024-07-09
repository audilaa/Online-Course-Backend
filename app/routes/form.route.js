module.exports = (app) => {
    const forms = require('../controllers/form.controller')
    const router = require('express').Router()
    const IsAdmin = require('../middleware/AdminMiddleware')

    router.post('/', forms.createForm)
    router.get('/', forms.findAllForm)
    router.get('/user/:id', forms.findFormByIdUser)
    router.get('/:id', forms.findByIdForm)
    router.put('/:id', IsAdmin, forms.updateForm)
    router.delete('/:id', forms.deleteForm)

    app.use('/api/form', router)
}