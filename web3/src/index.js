import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Shopnow from './Shop';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import About from './about';
import Register from './Register';
import Seller from './admin/seller';
import SellerInventoryManagement from './admin/item';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/shop" element={<Shopnow />} />
      <Route path="/home" element={<App/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/seller" element={<Seller/>} />
      <Route path="/item" element={<SellerInventoryManagement/>} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
