const { products, getProductById, updateStock } = require('../models/product');

const productService = {
  getAllProducts: () => {
    return products;
  },
  
  getProductById: (id) => {
    const product = getProductById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },
  
  checkStock: (productId, quantity) => {
    const product = getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    if (product.stock < quantity) {
      throw new Error(`Insufficient stock. Only ${product.stock} items available`);
    }
    
    return true;
  },
  
  reduceStock: (productId, quantity) => {
    const success = updateStock(productId, quantity);
    if (!success) {
      throw new Error('Failed to update stock');
    }
    return true;
  }
};

module.exports = productService;