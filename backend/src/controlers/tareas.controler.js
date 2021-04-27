const TareaSchema = require("../models/Tareas")
const { errorHandler } = require("../helpers/dberrorHandler")

exports.create = (req, res) => {
    const tarea = new TareaSchema(req.body)
    tarea.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ status: "tarea agregada" })
    })
}

exports.list = (req, res) => {
    TareaSchema.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}

exports.remove = async(req, res) => {
    await TareaSchema.findByIdAndDelete(req.params.id)
    res.json({ status: `tarea deleted ${req.params.id}` })
}

exports.edit = async(req, res) => {
    const { titulo, descripcion } = req.body
    const newTarea = { titulo, descripcion }
    const tareas = await TareaSchema.findByIdAndUpdate(req.params.id, newTarea)
    res.json(tareas)
}