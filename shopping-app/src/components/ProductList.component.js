import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/product-list.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';


export default function ProductListComponent() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
        
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (productId) => {
    const product = products.find((item) => item._id === productId);
    if (product.quantity > 0) {
      // Perform the action to add the product to the cart
      console.log(`Product ${productId} added to cart`);
      navigate(`/${productId}`);
    } else if(product.quantity === 0) {
      // Display the sold-out message
      toast.error("Ups... the item is sold out :( will be back soon!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Adjust the duration as needed
      });
    }
  };


  const addToFavorites = (productId) => {
    
    if (!favorites.includes(productId)) {
      // Add the product to favorites
      const updatedFavorites = [...favorites, productId];
      setFavorites(updatedFavorites);
      console.log(`Product ${productId} added to favorites`);
      // Store the updated favorites in local storage
        

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // Remove the product from favorites
      const updatedFavorites = favorites.filter((id) => id !== productId);
      setFavorites(updatedFavorites);
      console.log(`Product ${productId} removed from favorites`);

      // Store the updated favorites in local storage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };



  return (
    <div className="product-list-container"> {/* Apply the container class */}
      {products.map((product) => (
        <div className="product-card" key={product._id}> {/* Apply the card class */}
          <img className="product-image" src={product.image} alt={product.name} />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: {product.price}€</p>
          <div className={`product-quantity ${product.quantity > 0 ? "in-stock" : "sold-out"}`}>
            {product.quantity > 0 ? "In Stock" : "SOLD OUT"}
            </div>
            <button className="add-to-cart-button" onClick={() => addToCart(product._id)}>
            Add to Cart
          </button>
          <span className="favorites-link" onClick={() => addToFavorites(product._id)}>
            <FaHeart
              className={`heart-icon ${favorites.includes(product._id) ? 'red' : ''}`}
              style={{ color: favorites.includes(product._id) ? 'red' : 'black' }}
            />
          </span>
        </div>     
      ))}
    </div>
  );
}
