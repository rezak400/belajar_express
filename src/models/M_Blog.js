const mongoose = require("mongoose")
//! Untuk buat model dari tabelnya gitu
const Schema = mongoose.Schema;

//! Masukkan properti yang diperlukan
const BlogModel  = new Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    author:{
        type: Object,
        required : true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("BlogModel", BlogModel)