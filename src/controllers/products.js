exports.getAllProducts = (req,res,next) => {
    res.json({
        message : "Berhasil GET",
        data : [{
            nama : "Sari roti",
            quantity : 14
        }]
    })

    //? next buat apa?
    next()
}
 
exports.createProduct = (req,res,next) => {
    //! Console bisa dilihat di node terminal
    console.log(`lihat request`, req.body)

    //! Destructuring ES6 js
    const { name, quantity } = req.body
    console.log({name, quantity}, ` // ambil dari req body`)


    res.json({       
        message : "Berhasil POST",
        data : [{
            id: 1,
            //! Destructing ES6, jdi gk usah name:name
            name,
            quantity
        }]
    })
    next()
}