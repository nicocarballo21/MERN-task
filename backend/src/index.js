const express = require("express") // framework de back para node
const cors = require("cors") // sirve para comunicar dos servidores (front y back)
const morgan = require("morgan") // ver por consola las peticiones que llegan
const { mongoose } = require("./database")

const app = express()

//settings
app.set("port", process.env.PORT || 3000)
app.use(cors())

// Middlewares
app.use(morgan("dev"))
app.use(express.json())

// database setup

//routes setup
app.use("/api/", require("./routes/tareas"))

//listen port
app.listen(app.get("port"), () => {
    console.log(`Escuchando en puerto ${app.get("port")}`)
})