// const bcrypt = require('bcrypt')

module.exports = mongoose => {
    const schema = mongoose.Schema({
        username: String,
        phone: Number,
        password: String,
        role: String,
        // packet: [String],
    })

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    const User = mongoose.model("users", schema)

    // const user = new User({
    //     username: "admin",
    //     phone: "628934973912",
    //     password: bcrypt.hashSync("admin", 10),
    //     role: true,
    // })

    // user.save(User)

    return User
}