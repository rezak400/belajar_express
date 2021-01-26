//! ini pake js biasa, karna gk pake babel dll
const express = require('express')
const app = express();
const mongoose = require("mongoose")
//! Untuk menangani aturan CORS pada website
const cors = require('cors')

//! Body parser untuk menerjemahkan data dari request yg macem2, bisa json, xml, dll
const bodyParser = require("body-parser")


//! Body parser untuk menerjemahkan data dari request yg macem2, bisa json, xml, dll
app.use(bodyParser.json())

//! Mengaktifkan fungsi CORS
app.use(cors())


//! Ambil route mvc yg suda dibuat
const productRoutes = require("./src/routes/products")
const authRoutes = require("./src/routes/auth")
const blogRoutes = require("./src/routes/blog")

//! ini wajib, karna app itu corenya, dan harus callback router agar bisa dipake
app.use("/v1", productRoutes)
app.use("/v1/auth", authRoutes)
app.use(`/v1/blog`, blogRoutes)
app.get("/", (req,res) => {
    res.send("Welcome to Reza MERN Blog API, see the documentation here")
})

//! Connect ke MongoDB menggunakan module mongoose
mongoose.connect(`mongodb+srv://rezak400:185261@cluster0.miyep.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
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

