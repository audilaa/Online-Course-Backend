const db = require('../models')
const User = db.user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv');
dotenv.config();

exports.loginUser = (req, res) => {
    User.findOne({
        phone: req.body.phone
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: 'Invalid Password',
                    accessToken: null
                })
            }

            res.status(200).send({
                status: 'success',
                message: 'Login successfully',
                id: user._id,
                accessToken: generateAccessToken( { id: user._id } ),
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}

function generateAccessToken(userid) {
    return jwt.sign(userid, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}