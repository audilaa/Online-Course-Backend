const express = require('express')
const app = express()

var cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' })
})

require('./app/routes/course.route')(app)
require('./app/routes/login.route')(app)
require('./app/routes/register.route')(app)
require('./app/routes/packet.route')(app)
require('./app/routes/form.route')(app)

const db = require('./app/models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then((result) => {
        console.log('Connected to the database.')
    })
    .catch(err => {
        console.log('Cannot connect to the database.', err)
        process.exit()
    })

app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`)
})