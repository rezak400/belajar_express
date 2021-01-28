//! Buat validation secara terpisah
const {body} = require("express-validator")

exports.createBlog = [
    body("title").isLength({min:5}).withMessage("input tidak sesuai dari validator"),
    body("content").isLength({min:5}).withMessage("input tidak sesuai dari validator"),
]


