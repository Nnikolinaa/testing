
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductList from './components/ProductList.component';
import Navbar from './components/navbar.component';
import AddedItemComponent from './components/addedItem.component';
import Cart from './components/cart.component';
import FavoritesComponent from './components/favorites.component';
import TestingComponent from './components/testing';

function App() {





  return (
   <Router>
      <Navbar /> 
    <Routes>
    <Route path="/" exact element = {<ProductList />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/favorites" element={<FavoritesComponent />} />
    <Route path="/:productId" element={<AddedItemComponent />} />
    <Route path="/testing" element={<TestingComponent />} />
      <Route />
    </Routes>
    <ToastContainer />
   </Router>
  );
}

export default App;
