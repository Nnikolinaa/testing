import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import '../styles/navbar.css';



const Navbar = () => {



  return (
    <div className="navbar-container">
      <p className="logo">
        <Link to="/">DressCode</Link>
      </p>
      <ul className="nav-links">
        <li>
          <Link to="/signin">
            <FaUser className="icon" />
            Sign In</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/favorites">
            <FaHeart className="icon" />
            Favorites
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <FaShoppingCart className="icon" />
            Shopping Cart
          </Link>
        </li>
        <li>
          <Link to="/testing">Test</Link> {/* Link to the testing page */}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
