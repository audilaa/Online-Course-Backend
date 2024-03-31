const db = require('../models')
const Course = db.course

exports.findAll = (req, res) => {
    Course.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.status(409).send({
                message: err.message
            })
        });
}