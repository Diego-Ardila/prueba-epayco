const { Schema , model, models } = require('mongoose')


//Esquema para la creacion de la coleccion de Compras en la base de datos
const purchaseSchema = new Schema ({
    value:{
        type: Number,
        required: true
    },
    //Token que se genera para enviar por correo y confirmar la compra
    token:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})



const Purchase = new model('Purchase', purchaseSchema)

module.exports = Purchase