//! ini pake js biasa, karna gk pake babel dll
const express = require('express')
const app = express();

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

//! ini wajib, karna app itu corenya, dan harus callback router agar bisa dipake
app.use("/v1", productRoutes)
app.use("/v1/auth", authRoutes)


//! Atur PORT   
const port = 4000
app.listen(process.env.PORT || port , () => {
    console.log(`Listening on port ${port}`)
});

//! ini cara gamblang buat api tanpa controller router
// const router = express.Router()

// router.get("/user", (req,res,next) => {
//     res.json({
//         name : "reza",
//         umur : 17,
//         hobby : [{
//             bola : "jago"
//         },{
//             gitar : "mayan"
//         }],
//         tes : {
//             tes : {
//                 tes : {
//                     1: {
//                         object : 1
//                     },
//                     2:{
//                         object:2
//                     }
//                 }
//             }
//         }
//     })
//     next()
// })

// router.get("/product", (req,res,next) => {
//     res.json({
//         name : "Toyota",
//         umur : 17,
//     })
//     next()
// })