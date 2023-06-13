// Import necessary modules
const express = require('express'); // Express.js framework for building web applications
const cors = require('cors'); // Imports the CORS (Cross-Origin Resource Sharing) middleware, which allows requests from different origins to access your server's resources.
const mongoose = require('mongoose'); // imports Mongoose, an Object-Document Mapping (ODM) library for MongoDB, which simplifies working with MongoDB in a Node.js application.

require('dotenv').config(); // Loads environment variables from a .env file

const app = express(); // Create an Express application
const port = process.env.PORT || 3000; // Define the port on which the server will run

app.use(cors()); // Adds the CORS middleware to the Express application, enabling cross-origin requests.
app.use(express.json()); //  Adds the built-in Express middleware to parse incoming JSON request bodies.

const uri = process.env.ATLAS_URI; // Get MongoDB connection URI from environment variables
mongoose.connect(uri, { useNewUrlParser: true }); // Connect to MongoDB database using the provided URI

const connection = mongoose.connection; // Get the default connection object
connection.once('open', () => {
  console.log("MongoDB connection established successfully");
});

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter  =require('./routes/carts');

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
