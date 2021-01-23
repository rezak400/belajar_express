import express from 'express'

const app = express();

app.use(() => {
    console.log("hello dari express")
})
app.listen(4000);