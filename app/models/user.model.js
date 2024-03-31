const bcrypt = require('bcrypt')

module.exports = mongoose => {
    const schema = mongoose.Schema({
        username: String,
        email: String,
        password: String,
    })

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    const User = mongoose.model("users", schema)

    // const user = new User({
    //     username: "admin",
    //     email: "admin@localhost",
    //     password: bcrypt.hashSync("admin", 10)
    // })

    // user.save(User)

    return User
}