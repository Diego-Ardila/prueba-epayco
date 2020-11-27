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
            await user.save({validateBeforeSave: false})
        //Envio del email que contiene el token
            //await purchaseConfirmation(token, user)
            res.status(200).json(purchase)
        }catch(err){
            res.status(200).json(err.message)
        }
    },
//Controlador que se encarga de validar la compra, recibiendo el token y el id de la compra y revisando que sean validos
    async validatePurchase(req,res){
        try{
            const {userId} = req
            const {purchaseId, token} = req.body
            //Validando el id de la compra
            const purchase = await Purchase.findById(purchaseId)
            if(!purchase) throw new Error('Id de compra no valido')
            //Validando el token enviado con el almacenado en la entidad de la compra
            if(token.toString() !== purchase.token) throw new Error('El token no es valido')
            //Validando que esa compra solo se pague una vez
            if(purchase.approved) throw new Error('Esta compra ya fue pagada')
            //Si pasa todas las validaciones se actualiza su estado a aprovado y se descuenta de la billetera del cliente
            purchase.approved = true
            await purchase.save({validateBeforeSave: false})
            const user = await User.findById(userId)
            user.wallet -= purchase.value
            await user.save({validateBeforeSave: false})
            res.status(200).json("compra aprobada")
        }catch(err){
            res.status(400).json(err.message)
        }
    }
}