module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        userid: String,
        
        jenjang: String, //Sd, Smp, Smk, Sma
        pertemuan: String, // 1x pertemuan, 2x pertemuan, 3x pertemuan
        matapelajaran: String, // Matematika, Bahasa Indonesia, Bahasa Inggris, IPA, IPS

        nama: String,
        alamat: String,
        tglLahir: String,
        pendidikan: String,
        agama: String,
        orangtua: String,
        pekerjaanOrangTua: String,
        created_at: {
            type: Date,
            default: Date.now
        }
    })


    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    const User = mongoose.model("forms", schema)

    return User
}