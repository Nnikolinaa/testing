import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/added-item.css';
import { toast } from 'react-toastify';


export default function AddedItemComponent() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setErrorMessage('');
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage('You must select the size if you wish to continue.');
    }  else {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const newItem = { ...product, size: selectedSize };
        const updatedCartItems = [...cartItems, newItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
        toast.success(`${product.name} is added to the shopping cart.`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      }
    };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="added-item-box">
        <div>
        <img className="added-item-image" src={product.image} alt={product.name} />
      </div>
      <h2>{product.name}</h2>
      <p>Price: {product.price}€</p>
      <p>Description: {product.description}</p>
      <p>
        Size:
        <select className="size-options" value={selectedSize} onChange={handleSizeChange}>
          <option value="">Select size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
