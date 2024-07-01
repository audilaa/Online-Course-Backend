module.exports = (app) => {
    const forms = require('../controllers/form.controller')
    const router = require('express').Router()

    router.post('/', forms.createForm)
    router.get('/', forms.findAllForm)
    router.get('/:id', forms.findFormByIdUser)
    router.get('/:id', forms.findByIdForm)
    router.delete('/:id', forms.deleteForm)

    app.use('/api/form', router)
}