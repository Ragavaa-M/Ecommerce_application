const cartService = require('../services/cartService');
const responseHandler = require('../utils/responseHandler');

const cartController = {
  getCart: (req, res) => {
    try {
      // In a real app, userId would come from authentication
      const userId = req.headers['x-user-id'] || 'default-user';
      const cart = cartService.getCart(userId);
      responseHandler.success(res, cart, 'Cart retrieved successfully');
    } catch (error) {
      responseHandler.error(res, error.message, 500);
    }
  },
  
  addToCart: (req, res) => {
    try {
      // In a real app, userId would come from authentication
      const userId = req.headers['x-user-id'] || 'default-user';
      const { productId, quantity } = req.body;
      
      if (!productId || !quantity || quantity <= 0) {
        return responseHandler.error(res, 'Product ID and valid quantity are required', 400);
      }
      
      const cart = cartService.addToCart(userId, productId, quantity);
      responseHandler.success(res, cart, 'Item added to cart successfully');
    } catch (error) {
      responseHandler.error(res, error.message, 400);
    }
  },
  
  updateCartItem: (req, res) => {
    try {
      // In a real app, userId would come from authentication
      const userId = req.headers['x-user-id'] || 'default-user';
      const { itemId } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity < 0) {
        return responseHandler.error(res, 'Valid quantity is required', 400);
      }
      
      const cart = cartService.updateCartItem(userId, itemId, quantity);
      responseHandler.success(res, cart, 'Cart item updated successfully');
    } catch (error) {
      responseHandler.error(res, error.message, 400);
    }
  },
  
  removeFromCart: (req, res) => {
    try {
      // In a real app, userId would come from authentication
      const userId = req.headers['x-user-id'] || 'default-user';
      const { itemId } = req.params;
      
      const cart = cartService.removeFromCart(userId, itemId);
      responseHandler.success(res, cart, 'Item removed from cart successfully');
    } catch (error) {
      responseHandler.error(res, error.message, 400);
    }
  },
  
  checkout: (req, res) => {
    try {
      // In a real app, userId would come from authentication
      const userId = req.headers['x-user-id'] || 'default-user';
      
      const result = cartService.checkout(userId);
      responseHandler.success(res, result, 'Checkout successful');
    } catch (error) {
      responseHandler.error(res, error.message, 400);
    }
  }
};

module.exports = cartController;