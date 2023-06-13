const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');

// Route for adding a product to the cart
router.post('/add', async (req, res) => {
  try {
    const { productId } = req.body;

    // Create a new cart instance
    const newCartItem = new Cart({
      product: productId,
    });

    // Save the new cart item to the database
    await newCartItem.save();

    res.json('Product added to cart successfully!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

// Route for getting all cart items
router.get('/', async (req, res) => {
  try {
    // Retrieve all cart items and populate the 'product' field with details from the Product model
    const cartItems = await Cart.find().populate('product');

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
});



// Route for removing a product from the cart
router.delete('/remove/:id', async (req, res) => {
  try {
    const cartItemId = req.params.id;

    // Remove the cart item from the database
    await Cart.findByIdAndDelete(cartItemId);

    res.json('Product removed from cart successfully!');
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product from cart' });
  }
});

module.exports = router;
