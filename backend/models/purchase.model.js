const { Schema , model, models } = require('mongoose')


//Esquema para la creacion de la coleccion de Compras en la base de datos
const purchaseSchema = new Schema ({
    value:{
        type: Number,
        required: true
    },
    //Token que se genera para enviar por correo y confirmar la compra
    token:{
        type: Number,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //Variable que ayuda a verificar que la compra ya este pagada para que el cliente no pague varias veces la misma compra
    approved:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})



const Purchase = new model('Purchase', purchaseSchema)

module.exports = Purchase