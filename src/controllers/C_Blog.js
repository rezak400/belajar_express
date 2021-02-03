const {validationResult} = require("express-validator")
//! Panggil Model
const BlogModel = require("../models/M_Blog")

//! module node untuk mengatasi file
const path = require("path")
const fs = require("fs")

//! function untuk remove image pada file
const removeImage = (filePath) => { 
    console.log(`file path`, filePath)
    console.log(`dir name `, __dirname)

    filePath = path.join(__dirname, `../..`,filePath)
    fs.unlink(filePath, err => console.log(err))
}

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

//! Update
exports.updateBlog = (req,res,next) => {

    //! ambil property di object body
    const { title, content, author } = req.body;
    //! ambil id dari params
    const { id } = req.params
    
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
    
    console.log(`tes`);

    BlogModel.findById(id)
    .then(blog => {
        //! Cari data dari id, ada atau engga?
        if(!blog){
            const error = new Error(`Data blog dari id tidak ditemukan`)
            error.errorStatus = 404;
            throw error
        }
       
        //! Kalo ada, baru kita ganti
        blog.title = title
        blog.content = content
        blog.image = req.file.path

        //! kita save, dan akan menghasilkan PROMISE, maka harus di then lagi
        return blog.save()
    })
    .then(result => {
        res.status(200).json({
            message : "Update Sukses",
            data : result
        })
    })
    .catch(err => next(err))

}

exports.getAllBlog = (req,res,next) => {
    //! diurutin dari yg duluan di buat
    BlogModel.find().sort({createdAt:-1})
    .then(result => {
        res.status(200).json({
            message : "Data Blog berhasil di GET",
            data : result
        })

        console.log(`LOG :: Berhasil get all blog data dari API`)
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

// ! delete
exports.deleteBlog = (req,res,next) => {
    //! ngambil dari url param di router 
    const { id } = req.params
    //! mongoose findbyid lewat model
    BlogModel.findById(id)
    .then(blog => {
        if(!blog){
            const error = new Error("Blog id tidak ditemukan")
            error.errorStatus = 404
            throw error
        }

        removeImage(blog.image)
        //! menghapus, dan mengembalikan promise
        return BlogModel.findByIdAndRemove(id)
    })
    .then(result => {
        res.status(200).json({
            message : `Berhasil Hapus`,
            data : result
        })
    })
    .catch(err => next(err))
}