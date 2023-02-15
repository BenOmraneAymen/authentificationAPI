require("./datatbase")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const authRoute = require("./routes/authRoute")

dotenv.config()

app.use(bodyParser.json())
console.log("process.env.PORT:",process.env.PORT)

app.use('/',authRoute)

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})