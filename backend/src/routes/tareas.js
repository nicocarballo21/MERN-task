const express = require("express")
const router = express.Router()

const { create, list, remove, edit } = require("../controlers/tareas.controler")

router.get("/tareas", list)
router.post("/create", create)
router.delete("/delete/:id", remove)
router.put("/edit/:id", edit)

module.exports = router