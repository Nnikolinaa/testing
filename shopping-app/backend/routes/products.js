const router = require('express').Router();
const Product = require('../models/product.model');

// Route for creating a new product
router.route('/add').post((req, res) => {
  try {
    // Retrieve product details from the request body
    const { name, price, description, image, quantity } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      quantity
    });

    // Save the new product to the database
    newProduct
      .save()
      .then(() => res.json('Product created!'))
      .catch(err => res.status(400).json('Error: ' + err));

  } catch (error) {
    // Return an error message if product creation fails
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Route for getting all products
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: 'Failed to retrieve products' }));
});

// Route for getting product details by ID
router.route('/:productId').get((req, res) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ error: 'Failed to retrieve product details' }));
});



// Route for updating product details
router.route('/update/:productId').post((req, res) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then(product => {
      // Update product details
      product.name = req.body.name;
      product.price = req.body.price;
      product.description = req.body.description;
      product.image = req.body.image;
      product.quantity = req.body.quantity;

      // Save the updated product to the database
      product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(500).json({ error: 'Failed to retrieve product for updating' }));
});

// Route for deleting a product
router.route('/:productId').delete((req, res) => {
  const productId = req.params.productId;

  Product.findByIdAndDelete(productId)
    .then(() => res.json('Product deleted!'))
    .catch(err => res.status(500).json({ error: 'Failed to delete product' }));
});

module.exports = router;
