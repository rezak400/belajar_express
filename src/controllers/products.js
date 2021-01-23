exports.getAllProducts = (req,res,next) => {
    res.json({
        message : "Berhasil GET",
        data : [{
            nama : "Sari roti",
            quantity : 14
        }]
    })
    next()
}
 
exports.createProduct = (req,res,next) => {
    res.json({       
        message : "Berhasil POST",
        data : [{
            nama : "Sari roti post",
            quantity : 20
        }]
    })
    next()
}