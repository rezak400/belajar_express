//! ini pake js biasa, karna gk pake babel dll
const express = require('express')
const app = express();
const productRoutes = require("./src/routes/products")

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

//! ini wajib, karna app itu corenya, dan harus callback router agar bisa dipake
app.use("/", productRoutes)
 
app.listen(4000);