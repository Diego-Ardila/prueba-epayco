const Purchase = require('../models/purchase.model')
const User = require('../models/user.model')
const { gen } = require('n-digit-token')
const {purchaseConfirmation} = require('../utils/emails')

module.exports = {
//Controlador que se encarga de crear una nueva compra 
    async createPurchase(req,res){
        try{
        //Validacion de que el saldo alcanza para realizar la compra
            const {userId} = req
            const {value} = req.body
            const user = await User.findById(userId)
            if(parseInt(value) > user.wallet) throw new Error('El valor de la compra supera tu saldo')
        //Si el saldo alcanza se procede a generar el token, a crear la compra en la base de datos 
        //y a guardar el id del token en el usuario
            const token = gen(6)
            const purchase = await Purchase.create({value, token, userId})
            user.purchase.push(purchase._id)
            user.save({validateBeforeSave: false})
        //Envio del email que contiene el token
            await purchaseConfirmation(token, user)
            res.status(200).json(purchase)
        }catch(err){
            res.status(200).json(err.message)
        }
    }
}