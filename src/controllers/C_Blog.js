const {validationResult} = require("express-validator")
//! Panggil Model
const BlogModel = require("../models/M_Blog")

exports.createBlog = (req,res,next) => {
    //! ambil property di object body
    const { title, content, image, author } = req.body;
     
    //! apabila request biasa error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //! mengambil error object dari default pada app.js
        const err = new Error("Invalid Value");  //? membuat error msg global
        err.errorStatus = 400;
        err.data = errors.array()
        throw err
    }

    //! apabila input request image error
    if(!req.file){
        //! mengambil error object dari default pada app.js
        const err = new Error("Image harus di upload");  //? membuat error msg global
        err.errorStatus = 422;
        throw err
    }

    //! menentukan apa yg dilakukan terhadap model
    const POST = new BlogModel({
        title,
        content,
        image: req.file.path,
        author : {
            uid : 1,
            name : "dummy_user"
        }
    })

    //! Masukkan ke database, kemudian beri response ke client
    POST.save()
    .then(result => {
        //! kirim response ke client, dan kirim data dari model yg sudah diisi dalam variabel $result
        res.status(200).json({
            message : "Create Blog Success",
            data: result
        })
    })
    .catch(err => console.log({err}, `Error create blog`))

}

exports.getAllBlog = (req,res,next) => {
    //! diurutin dari yg duluan di buat
    BlogModel.find().sort({createdAt:-1})
    .then(result => {
        res.status(200).json({
            message : "Data Blog berhasil di GET",
            data : result
        })
    })
    .catch(err => next(err)) //? kenapa pakai next?
}

exports.getBlogById = (req,res,next) => {
    //! ngambil dari url param di router 
    const { id } = req.params
    //! mongoose findbyid lewat model
    BlogModel.findById(id)
    .then(result => {
        if(!result){
            const error = new Error("Blog id tidak ditemukan")
            error.errorStatus = 404
            throw error
        }
        res.status(200).json({
            message : "Data berhasil di get",
            data : result
        })
    })
    .catch(err => next(err))


}