const express = require("express")
const app = express()
const PORT = 3000;
const cors = require("cors")
const register = require("./Register/index.js")
const login = require("./Login/index")
const clicker = require("./Clicker/index.js")
const main = require("./Main/index.js")

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/',register)
app.use('/',login)
app.use('/',clicker)
app.use('/',main)


app.listen(PORT, ()=>{
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
})