const mongoose = require("mongoose")

mongoose.set("useFindAndModify", false)

mongoose
    .connect("mongodb://localhost/api-react", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("conectado a base de datos")
    })
    .catch((err) => {
        console.log(err.message)
    })

module.exports = mongoose