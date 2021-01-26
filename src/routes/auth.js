const express = require('express')

//! versi minified buat router, drpd pake app, lebih modular dan gampang kedepannya
const router = express.Router()

const authController = require("../controllers/auth")

// ! mengambil controller sebagai callback
// /v1/auth/{dynamic}
router.post("/register", authController.register)

module.exports = router