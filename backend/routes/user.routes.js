const router = require('express').Router()
const userController = require ('../controllers/user.controller')

//Ruta para crear el usuario
router.route('/').post(userController.createUser)
//Ruta para loguearse con un usuario ya existente
router.route('/login').post(userController.login)



module.exports = router