require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const songsRoutes = require("./routes/tracks.routes")
const notificationsRoutes = require("./routes/notifications.routes")

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use(songsRoutes)
app.use(notificationsRoutes)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server started")
})