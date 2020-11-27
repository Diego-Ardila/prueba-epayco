const { connection, connect } = require("mongoose")

function db () {
    //Inicializando las variables
    const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/epaycoDiegoArdila"

    const options = { 
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex: true,
        useFindAndModify:false
    }

    //conexion a la base de datos de mongo
    connect(uri, options)

    //funciones ejecutadas tras el evento de conexion
    connection.once("open", () => console.log("connection to database stablished"))
    connection.on("error", (err) => console.log("connection lost", err))
    
}
module.exports = db