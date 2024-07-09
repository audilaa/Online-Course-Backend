const db = require('../models')
const User = db.user
const bcrypt = require('bcrypt')

exports.createUser = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({ message: 'Name cannot be empty.' })
        return
    }

    const user = new User({
        username: req.body.username,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10),
        role: "user",
    })

    user
        .save(user)
        .then(data => {
            res.status(201).send({
                status: 'success',
                message: 'register successfully',
                data: {
                    userId: data._id,
                }
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the User.'
            })
        })
}