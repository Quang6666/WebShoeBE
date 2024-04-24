const express = require("express");
const router = express.Router()
const CartController = require ('../controllers/CartController')

router.post('/createCart', CartController.createCart)
router.get('/getCart/:userId', CartController.getCartByUserId)
router.delete('/deleteCart/:userId', CartController.deleteCartByUserId)
router.post('/deleteCarts', CartController.deleteCarts);
router.get('/getAllCart', CartController.getAllCarts)
router.put('/updateCart/:userId', CartController.updateCartByUserId)
module.exports = router