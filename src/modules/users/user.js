const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller.js');
const { authenticateJWT } = require('../middleware/middleware.js'); 

router.get('/dresses', userController.listDresses); 
router.get('/dresses/:id', userController.getDressById); 
router.put('/UpdateProfile', authenticateJWT, userController.updateProfile);
router.get('/search', authenticateJWT,userController.searchDresses); 
router.post('/order', authenticateJWT, userController.createOrder); 
router.get('/orders', authenticateJWT, userController.getAllOrders); 
router.get('/orders/:orderId', authenticateJWT, userController.getOrderById);
router.post('/wishlist', authenticateJWT, userController.addToWishlist);
router.get('/wishlist', authenticateJWT, userController.getWishlist);
router.delete('/wishlist/:dressId', authenticateJWT, userController.removeFromWishlist);


module.exports = router;
