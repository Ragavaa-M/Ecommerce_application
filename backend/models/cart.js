const { v4: uuidv4 } = require('uuid');

// In-memory cart store
const carts = {};

module.exports = {
  getCartByUserId: (userId) => {
    if (!carts[userId]) {
      carts[userId] = {
        userId,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    return carts[userId];
  },
  
  addItemToCart: (userId, productId, quantity) => {
    const cart = carts[userId] || {
      userId,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        id: uuidv4(),
        productId,
        quantity,
        addedAt: new Date()
      });
    }
    
    cart.updatedAt = new Date();
    carts[userId] = cart;
    
    return cart;
  },
  
  updateCartItem: (userId, itemId, quantity) => {
    const cart = carts[userId];
    if (!cart) return null;
    
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return null;
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    cart.updatedAt = new Date();
    return cart;
  },
  
  removeCartItem: (userId, itemId) => {
    const cart = carts[userId];
    if (!cart) return null;
    
    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return null;
    
    cart.items.splice(itemIndex, 1);
    cart.updatedAt = new Date();
    
    return cart;
  },
  
  clearCart: (userId) => {
    if (carts[userId]) {
      carts[userId].items = [];
      carts[userId].updatedAt = new Date();
      return carts[userId];
    }
    return null;
  }
};