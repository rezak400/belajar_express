const {validationResult} = require("express-validator")

exports.createBlog = (req,res,next) => {
    //! ambil property di object body
    const { title, content, image, author } = req.body;
     
    //! apabila error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            message : "Error",
            data : null
        })
    }
    //! masukkan ke result agar dikirim sebagai response
    const result = {
        message : "Create Blog Success",
        data: {
            title,
            content,
            image,
            author
        }
    }
    //! kirim response ke client dari variabel result
    res.status(201).json(result)
}

exports.getAllBlog = (req,res,next) => {
    res.status(200).json({
            _id : 1,
            title : "Judul Blog",
            content : "lorem aksd[oajspdojaspdojhapsdoijaspo",
            image : "blabal/lbab/jpg",
            author : {
                uid : 1,
                name : "reza",
            }
        })
}