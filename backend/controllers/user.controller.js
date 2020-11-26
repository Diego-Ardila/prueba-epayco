const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
//Controlador que maneja la logica para crear un usuario y guardarlo en la base de datos
  async createUser(req, res) {
    const data = req.body
    try{
      data.password = await bcrypt.hash(data.password, 7)
      const user= await User.create(data)
      const token= jwt.sign(
        {id: user._id},
        process.env.SECRET_KEY,
        {expiresIn: 60*60*24}
      )
      res.status(200).json(token)
    }catch(err){
        res.status(400).json(err.message)
      
    }
  },
//Controlador que maneja la logica para loguearse con usuario ya existente en la base de datos
  async login(req, res) {
    try{
      const {email, password} = req.body
      const user= await User.findOne({email})
      if(!user){
        throw new Error('El usuario es invalido')
      }
      const isValid= await bcrypt.compare(password, user.password)
      if(!isValid) {
        throw new Error('La contraseña es invalida')
      }
      const token= jwt.sign(
        {id: user._id},
        process.env.SECRET_KEY,
        {expiresIn: 60*60*24}
      )
      res.status(200).json({token, user})
    }catch(err){
      res.status(400).json(err.message)
    }
  },
//Controlador que se encarga de recargar la billetera
  async updateWallet(req,res) {
      try{
          const {userId} = req
          const {value} = req.body
          const user = await User.findById(userId)
          user.wallet += parseInt(value)
          await user.save({validateBeforeSave: false})
          res.status(200).json(user)
      }catch(err){
          res.status(400).json(err.message)
      }
  },
//Controlador que se encargara de Brindar el saldo de su billetera al cliente
  async getWallet(req,res){
    try{
      const {userId} = req
      const {phoneNumber, document} = req.body
      const user = await User.findById(userId)
      //Validaciones con la informacion recibida sobre el Documento y Numero Celular para que 
      //coincida con la guardada en la BD
      if(user.phoneNumber !== phoneNumber && user.document !== document) throw new Error('El numero Celular y el Document no coinciden')
      if(user.phoneNumber !== phoneNumber) throw new Error('El numero Celular no coincide')
      if(user.document !== document) throw new Error('El documento de identificacion no coincide')
      res.status(200).json(user.wallet)
    }catch(err){
      res.status(400).json(err.message)
    }
  }
} 
