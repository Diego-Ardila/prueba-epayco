const router = require('express').Router()
const purchaseController = require ('../controllers/purchase.controller')
const { auth } = require('../utils/middlewares')

//Ruta para crear la compra
router.route('/').post(auth, purchaseController.createPurchase)
//Ruta para validar la compra
router.route('/').put(auth, purchaseController.validatePurchase)




module.exports = router