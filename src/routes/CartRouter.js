const express = require("express");
const router = express.Router()
const CartController = require ('../controllers/CartController')

router.post('/createCart', CartController.createCart)
router.get('/getCart/:userId', CartController.getCartByUserId)
router.delete('/deleteCart/:id', CartController.deleteCartByUserId)

module.exports = router