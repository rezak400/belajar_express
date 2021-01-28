//! ini pake js biasa, karna gk pake babel dll
const express = require('express')
const app = express();
const mongoose = require("mongoose")
 
//! Untuk menangani aturan CORS pada website
const cors = require('cors')
//! Mengaktifkan fungsi CORS
app.use(cors())

//! Body parser untuk menerjemahkan data dari request yg macem2, bisa json, xml, dll
const bodyParser = require("body-parser")
//! Body parser untuk menerjemahkan data dari request yg macem2, bisa json, xml, dll
app.use(bodyParser.json())

//! Untuk ngurusin yang berkaitan dengan file, yauitu ketika inputannya form data
const multer = require("multer")
const path = require("path")
const fileStorage = multer.diskStorage({    //? setting path destionation file
    destination : (req,file,cb) => {
        cb(null, `images`)
    },
    filename : (req,file,cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname )
    }
})
const fileFilter = (req,file,cb) => {       //? setting file filter
    if( file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" || 
        file.mimetype === "image/jpeg" ){
        cb(null, true)
    } else {
        cb(null, false)
    }
}
app.use(multer({storage:fileStorage, fileFilter:fileFilter }).single(`image`)) //? single() argumennya dari properti db yaitu "image"
//! untuk membolehkan akses image pada folder image static
app.use("/images", express.static(path.join(__dirname, "images")))

//! Ambil route mvc yg suda dibuat
const productRoutes = require("./src/routes/products")
const authRoutes = require("./src/routes/auth")
const blogRoutes = require("./src/routes/R_Blog")   
//! ini wajib, karna app itu corenya, dan harus callback router agar bisa dipake
app.use("/v1", productRoutes)
app.use("/v1/auth", authRoutes)
app.use(`/v1/blog`, blogRoutes)
app.get("/", (req,res) => {
    res.send("Welcome to Reza MERN Blog API, see the documentation here")
})

//! membuat default error, membuat parent error yg nantinya akan dipake kondisional di controller
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const message = error.message;
    const data = error.data

    res.status(status).json({ message,data })
})

//! Connect ke MongoDB menggunakan module mongoose
mongoose.connect(`mongodb+srv://rezak400:185261@cluster0.miyep.mongodb.net/Blog?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    //! Atur PORT   
    const port = 4000
    app.listen(process.env.PORT || port , () => {
        console.log(`MongoDb connection SUCCESS, Listening on port ${port}`)
    });
})
.catch(err => console.log(err))

