// In-memory product store
const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 999.99,
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    category: 'Electronics',
    stock: 10
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 699.99,
    description: 'Latest smartphone with 5G capability',
    category: 'Electronics',
    stock: 25
  },
  {
    id: 3,
    name: 'Headphones',
    price: 149.99,
    description: 'Noise-cancelling wireless headphones',
    category: 'Electronics',
    stock: 15
  },
  {
    id: 4,
    name: 'T-shirt',
    price: 19.99,
    description: 'Cotton t-shirt, available in multiple colors',
    category: 'Clothing',
    stock: 50
  },
  {
    id: 5,
    name: 'Jeans',
    price: 49.99,
    description: 'Classic fit denim jeans',
    category: 'Clothing',
    stock: 30
  }
];

module.exports = {
  products,
  getProductById: (id) => products.find(p => p.id === parseInt(id)),
  updateStock: (id, quantity) => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      product.stock -= quantity;
      return true;
    }
    return false;
  }
};