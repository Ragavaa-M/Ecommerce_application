const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/cart', cartController.getCart);
router.post('/cart/add', cartController.addToCart);
router.put('/cart/update/:itemId', cartController.updateCartItem);
router.delete('/cart/remove/:itemId', cartController.removeFromCart);
router.post('/cart/checkout', cartController.checkout);

module.exports = router;