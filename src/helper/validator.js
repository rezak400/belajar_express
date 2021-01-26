//! Buat validation secara terpisah
const {body} = require("express-validator")

exports.createBlog = [
    body("title").isLength({min:5}),
    body("content").isLength({min:5})
]