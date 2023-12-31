// Importing necessary dependencies and hooks from React and axios.

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Defining a functional component called TestingComponent.
// Using the useState hook to declare several state variables (products, editMode, updatedProduct, newProduct, and setCartItems) and their corresponding setter functions.
export default function TestingComponent() {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({ title: '', body: '' });
  const [ setCartItems] = useState([]);

  // Using the useEffect hook to fetch products from a remote API (https://jsonplaceholder.typicode.com/posts) when the component mounts.
// Updating the products state with the fetched data using the setProducts setter function.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Defining a function handleDelete to remove a product from the products state array based on its id.
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

// Defining a function handleUpdate to set the updatedProduct state to the product object that matches the provided id.  
//Enabling the edit mode by setting editMode state to true
  const handleUpdate = (id) => {
    const productToUpdate = products.find((product) => product.id === id);
    setUpdatedProduct(productToUpdate);
    setEditMode(true);
  };

  const handleSaveUpdate = () => {
    const updatedProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }
      return product;
    });

    setProducts(updatedProducts);
    setEditMode(false);
  };

  // Defining a function handleSaveUpdate to update the products state array by replacing the product with the matching id with the updatedProduct.
 // Disabling the edit mode by setting editMode state to false.
  const handleCancelUpdate = () => {
    setEditMode(false);
  };
 // Defining a function handleChange to update the updatedProduct state based on the changes made in the input fields.
 // It uses object destructuring to extract the name and value from the event target and updates the corresponding property of updatedProduct using the spread syntax.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  
  
  const handleAddNew = () => {
    const newId = Math.max(...products.map((product) => product.id)) + 1;
    const newProductData = { id: newId, ...newProduct };
    setProducts([...products, newProductData]);
    setNewProduct({ title: '', body: '' });
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddToCart = (product) => {
    // Create a new cart item with title and body properties
    const newItem = {
      id: product.id,
      title: product.title,
      body: product.body,
    };
  
    // Update the cart items state with the new item
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
  
    console.log('Add to Cart:', product);
  };

  return (
    <div className='parent'>
    <div>
      <input
        type="text"
        name="title"
        value={newProduct.title}
        onChange={handleNewInputChange}
        placeholder="Enter title"
      />
      <input
        type="text"
        name="body"
        value={newProduct.body}
        onChange={handleNewInputChange}
        placeholder="Enter body"
      />
      <button onClick={handleAddNew}>Add new item</button>
    </div>
    <div className="testing-list-container">
      {products.map((product) => (
        <div className="test" key={product.id}>
          {editMode && updatedProduct.id === product.id ? (
            <div>
              <input
                type="text"
                name="title"
                value={updatedProduct.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="body"
                value={updatedProduct.body}
                onChange={handleChange}
              />
              <button onClick={handleSaveUpdate}>Save</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </div>
          ) : (
            <div>
              <p className="testing-title">Title: {product.title}</p>
              <p className="testing-body">Body: {product.body}</p>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
              <button onClick={() => handleUpdate(product.id)}>Update</button>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          )}
        </div>
      ))}
    </div>
</div>
  );
}
