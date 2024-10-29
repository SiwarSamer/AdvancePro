const express = require('express');
const router = express.Router();
const userController = require('../users/user.controller.js');
const { authenticateJWT } = require('../middleware/middleware.js'); 


router.get('/dresses', userController.listDresses); 
router.get('/dresses/:id', userController.getDressById); 
router.put('/update-profile', authenticateJWT, userController.updateUserProfile); 
router.get('/search', userController.searchDresses); 
router.get('/orders', authenticateJWT, userController.getAllOrders); 
router.get('/orders/:orderId', authenticateJWT, userController.getOrderById);
router.post('/wishlist', authenticateJWT, userController.addToWishlist);
router.get('/wishlist', authenticateJWT, userController.getWishlist);
router.delete('/wishlist/:dressId', authenticateJWT, userController.removeFromWishlist);


module.exports = router;
