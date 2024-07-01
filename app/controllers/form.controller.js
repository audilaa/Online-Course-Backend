const db = require('../models')
const Form = db.form

exports.createForm = (req, res) => {
    if (!req.body.nama) {
        res.status(400).send({ message: 'Name cannot be empty.' })
        return
    }

    const form = new Form({
        userid: req.body.userid,
        jenjang: req.body.jenjang,
        pertemuan: req.body.pertemuan,
        matapelajaran: req.body.matapelajaran,
        nama: req.body.nama,
        alamat: req.body.alamat,
        tglLahir: req.body.tglLahir,
        pendidikan: req.body.pendidikan,
        agama: req.body.agama,
        orangtua: req.body.orangtua,
        pekerjaanOrangTua: req.body.pekerjaanOrangTua
    })

    form
        .save(form)
        .then(data => {
            res.status(201).send({
                status: 'success',
                message: 'Form was created successfully',
                data: {
                    formId: data._id,
                }
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Form.'
            })
        })
}

exports.findFormByIdUser = (req, res) => {
    const id = req.params.id

    Form.find({ userid: id })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Not found Form with id ${id}`
                })
            } else {
                res.send({
                    status: 'success',
                    message: 'Form was retrieved successfully',
                    data: data
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Form with id=${id}`
            })
        }
        )
}

exports.findAllForm = (req, res) => {
    const nama = req.query.nama
    let condition = nama ? { nama: { $regex: new RegExp(nama), $options: 'i' } } : {}

    Form.find(condition)
        .then(data => {
            res.send({
                status: 'success',
                message: 'Form was retrieved successfully',
                data: data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Form.'
            })
        })
}

exports.findByIdForm = (req, res) => {
    const id = req.params.id

    Form.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Not found Form with id ${id}`
                })
            } else {
                res.send({
                    status: 'success',
                    message: 'Form was retrieved successfully',
                    data: data
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Form with id=${id}`
            })
        })
}

exports.deleteForm = (req, res) => {
    const id = req.params.id

    Form.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Form with id=${id}. Maybe Form was not found!`
                })
            } else {
                res.send({
                    message: 'Form was deleted successfully!'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete Form with id=' + id
            })
        })
}