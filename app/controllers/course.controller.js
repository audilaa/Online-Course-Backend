const db = require('../models')
const Course = db.course

exports.findAll = (req, res) => {
    Course.find()
        .then(result => {
            res.status(200).send({
                status: true,
                message: 'Data found',
                data: result
            })
        })
        .catch(err => {
            res.status(409).send({
                message: err.message
            })
        });
}