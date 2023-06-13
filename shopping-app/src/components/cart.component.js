import React, { useState, useEffect } from 'react';
import '../styles/cart.css';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-price">Price: {item.price ? item.price.toFixed(2) : 'N/A'}€</p>
                <p className="cart-item-size">Size: {item.size}</p>
              </div>
              <button
                className="remove-button"
                style={{ background: 'transparent', color: '#111010', border: 'none', padding: 0, cursor: 'pointer', transition: 'transform 0.3s' }}
                onClick={() => handleRemoveItem(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <p className="cart-total">Total Price: {totalPrice.toFixed(2)}€</p>
          <Link to="/payment">
            <button className="checkout-button">Go to Payment</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
