import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/favorites.css';
import { FaTrash } from 'react-icons/fa';


const FavoritesComponent = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async (productId) => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
        return null;
      }
    };

    const fetchFavoriteProducts = async () => {
      const products = await Promise.all(favorites.map((productId) => fetchProduct(productId)));
      setFavoriteProducts(products.filter((product) => product !== null));
    };

    fetchFavoriteProducts();
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter((id) => id !== productId);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorite-container">
      {favoriteProducts.length === 0 ? (
        <p>No saved items</p>
      ) : (
        <div>
          {favoriteProducts.map((product) => (
            <div className="saved-item" key={product._id}>
              <img className="saved-item-image" src={product.image} alt={product.name} />
              <div className="saved-item-details">
                <h3 className="saved-item-title">{product.name}</h3>
                <p className="saved-item-price">Price: {product.price}€</p>
              </div>
              <button
              className="remove-button"
              style={{ background: 'transparent', color: '#111010', border: 'none', padding: 0, cursor: 'pointer', transition: 'transform 0.3s' }}
              onClick={() => removeFavorite(product._id)}>  <FaTrash /> </button>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default FavoritesComponent;
