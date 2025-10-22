const { getCartByUserId, addItemToCart, updateCartItem, removeCartItem, clearCart } = require('../models/cart');
const productService = require('./productService');

const cartService = {
  getCart: (userId) => {
    const cart = getCartByUserId(userId);
    
    // Enrich cart items with product details
    const enrichedItems = cart.items.map(item => {
      const product = productService.getProductById(item.productId);
      return {
        ...item,
        product: {
          id: product.id,
          name: product.name,
          price: product.price
        },
        subtotal: product.price * item.quantity
      };
    });
    
    // Calculate total
    const total = enrichedItems.reduce((sum, item) => sum + item.subtotal, 0);
    
    return {
      ...cart,
      items: enrichedItems,
      total
    };
  },
  
  addToCart: (userId, productId, quantity) => {
    // Check if product exists and has enough stock
    productService.checkStock(productId, quantity);
    
    // Add item to cart
    const cart = addItemToCart(userId, productId, quantity);
    
    return cart;
  },
  
  updateCartItem: (userId, itemId, quantity) => {
    // Get current cart to find the product
    const currentCart = getCartByUserId(userId);
    const item = currentCart.items.find(i => i.id === itemId);
    
    if (!item) {
      throw new Error('Cart item not found');
    }
    
    // If increasing quantity, check stock
    if (quantity > item.quantity) {
      productService.checkStock(item.productId, quantity - item.quantity);
    }
    
    // Update cart item
    const cart = updateCartItem(userId, itemId, quantity);
    
    if (!cart) {
      throw new Error('Failed to update cart item');
    }
    
    return cart;
  },
  
  removeFromCart: (userId, itemId) => {
    const cart = removeCartItem(userId, itemId);
    
    if (!cart) {
      throw new Error('Cart item not found');
    }
    
    return cart;
  },
  
  checkout: (userId) => {
    const cart = getCartByUserId(userId);
    
    if (cart.items.length === 0) {
      throw new Error('Cart is empty');
    }
    
    // Check stock for all items
    for (const item of cart.items) {
      productService.checkStock(item.productId, item.quantity);
    }
    
    // Reduce stock for all items
    for (const item of cart.items) {
      productService.reduceStock(item.productId, item.quantity);
    }
    
    // Clear cart
    clearCart(userId);
    
    return {
      success: true,
      message: 'Checkout successful',
      orderItems: cart.items
    };
  }
};

module.exports = cartService;