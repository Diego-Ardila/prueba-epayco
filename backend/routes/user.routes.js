const router = require('express').Router()
const userController = require ('../controllers/user.controller')
const { auth } = require('../utils/middlewares')

//Ruta para crear el usuario
router.route('/').post(userController.createUser)
//Ruta para loguearse con un usuario ya existente
router.route('/login').post(userController.login)
//Ruta para recargar la Billetera
router.route('/').put(auth, userController.updateWallet)



module.exports = router