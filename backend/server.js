require("dotenv").config({path: __dirname + '/.env.dev'})
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
//Importacion de las Rutas
const userRouter = require('./routes/user.routes')
const purchaseRouter = require('./routes/purchase.routes')

//Conexion a la base de Datos
const db = require("./config/dbConnection")
db() 

//Setup del servidor
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("common"))
app.use(helmet())

//End points
app.use('/user', userRouter)
app.use('/purchase', purchaseRouter)

const port = process.env.PORT || 8000

app.listen( port, () => {
    console.log(`listening ${port}`)
})