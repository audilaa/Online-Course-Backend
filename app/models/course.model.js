module.exports = mongoose => {
    const schema = mongoose.Schema({
        code: String,
        course: String,
        description: String,
        price: Number,
        imageUrl: String,
    })

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    const Course = mongoose.model("course", schema)
    return Course
}