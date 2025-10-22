const express = require('express');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const responseHandler = require('./utils/responseHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  responseHandler.error(res, err.message || 'Internal Server Error', 500);
});

// 404 handler
app.use('*', (req, res) => {
  responseHandler.error(res, 'Route not found', 404);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;