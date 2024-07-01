const dbconfig = require('../../config/db.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbconfig.url
db.course = require('./course.model.js')(mongoose)
db.user = require('./user.model.js')(mongoose)
db.packet = require('./packet.model.js')(mongoose)
db.form = require('./form.model.js')(mongoose)

module.exports = db