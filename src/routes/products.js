const express = require('express')

//! versi minified buat router, drpd pake app, lebih modular dan gampang kedepannya
const router = express.Router()

const productsController = require("../controllers/products")

// ! mengambil controller sebagai callback
router.get("/product", productsController.getAllProducts)
router.post("/product", productsController.createProduct)

module.exports = router