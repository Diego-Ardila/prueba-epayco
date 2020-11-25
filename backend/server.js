const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

//Conexion a la base de Datos
const db = require("./config/dbConnection")
db() 

//Setup del servidor
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("common"))
app.use(helmet())

const port = process.env.PORT || 8000

app.listen( port, () => {
    console.log(`listening ${port}`)
})