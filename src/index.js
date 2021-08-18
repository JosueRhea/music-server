require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const songsRoutes = require("./routes/tracks.routes")

const app = express();

app.use(cors())
app.use(morgan("dev"))

//routes
app.use(songsRoutes)

app.listen(5000, ()=>{
    console.log("Server on port 3000")
})
