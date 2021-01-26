exports.register = (req,res,next) => {
    const { name, email, password } = req.body
    console.log({name,email,password},`// cek rek body`)
    
    //! Masukkan kedalam variabel agar lebih modular
    const result = {
        message : "Register Success",
        data:{
            uid : 1, 
            name,
            email,
            password
        }
    }

    //! status untuk mengirimkan SOP kode status
    res.status(200).json(result)
    next()
}
