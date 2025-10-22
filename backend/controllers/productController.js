const productService = require('../services/productService');
const responseHandler = require('../utils/responseHandler');

const productController = {
  getAllProducts: (req, res) => {
    try {
      const products = productService.getAllProducts();
      responseHandler.success(res, products, 'Products retrieved successfully');
    } catch (error) {
      responseHandler.error(res, error.message, 500);
    }
  },
  
  getProductById: (req, res) => {
    try {
      const { id } = req.params;
      const product = productService.getProductById(id);
      responseHandler.success(res, product, 'Product retrieved successfully');
    } catch (error) {
      responseHandler.error(res, error.message, 404);
    }
  }
};

module.exports = productController;