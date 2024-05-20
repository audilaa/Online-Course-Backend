module.exports = (app) => {
    const packet = require('../controllers/packet.controller.js')
    const router = require('express').Router()
    const authentication = require('../middleware/authenticationToken')

    router.get('/', packet.findAll)
    router.get('/:id', packet.findPacket)
    router.post('/', packet.create)
    router.put('/:id', packet.update)
    router.delete('/:id', packet.delete)

    app.use('/api/packets' , router)
}