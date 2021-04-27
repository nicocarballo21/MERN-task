const mongoose = require("mongoose")

// modelo de la data
// tablas == collections
const tareasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        maxLength: 50
    },
    descripcion: {
        type: String,
        required: true,
        maxLength: 100
    }
})

module.exports = mongoose.model("Tareas", tareasSchema)