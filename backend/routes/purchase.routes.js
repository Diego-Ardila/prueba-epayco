const router = require('express').Router()
const purchaseController = require ('../controllers/purchase.controller')
const { auth } = require('../utils/middlewares')

//Ruta para crear la compra
router.route('/').post(auth, purchaseController.createPurchase)




module.exports = router