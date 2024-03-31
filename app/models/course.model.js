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

    const Course = mongoose.model("courses", schema)

    // const course = new Course({
    //     code: "CSE-001",
    //     course: "Computer Science",
    //     description: "This is a course on Computer Science",
    //     price: 1000,
    //     imageUrl: "https://via.placeholder.com/150"
    // })

    // course.save(course)
    return Course
}