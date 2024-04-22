const db = require('../models')
const User = db.user
const bcrypt = require('bcrypt')

exports.create = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({ message: 'Name cannot be empty.' })
        return
    }

    const user = new User({
        username: req.body.username,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the User.'
            })
        })
}