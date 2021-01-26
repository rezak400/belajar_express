const express = require('express')
//! Untuk validation
const validator = require("../helper/validator")

//! versi minified buat router, drpd pake app, lebih modular dan gampang kedepannya
const router = express.Router()

//! ngambil modul dari controller
const blogController = require("../controllers/blog")

// ! mengambil controller sebagai callback
//? url = /v1/blog/{method}
router.get("/get", blogController.getAllBlog)
router.post("/post", validator.createBlog, blogController.createBlog)

module.exports = router