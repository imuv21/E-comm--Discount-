import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layout/header/Header.jsx';
import DropdownComponent from './components/layout/dropdown/DropdownComponent.jsx';
import Footer from './components/layout/footer/Footer.jsx';
import Home from './components/pages/Home.js';
import ProductDetails from './components/pages/ProductDetails.js';
import Products from './components/pages/Products.js';
import Search from './components/pages/Search.js';
import LoginSignUp from './components/pages/LoginSignUp.js';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import { useSelector } from 'react-redux';
import Profile from './components/pages/Profile.js';
import UpdateProfile from './components/pages/UpdateProfile.js';
import UpdatePassword from './components/pages/UpdatePassword.js';
import ForgotPassword from './components/pages/ForgotPassword.js';
import ResetPassword from './components/pages/ResetPassword.js';
import Cart from './components/pages/Cart.js';
import Shipping from './components/pages/Shipping.js';
import ConfirmOrder from './components/pages/ConfirmOrder.js';
import axios from 'axios';
import Payment from './components/pages/Payment.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/pages/OrderSuccess.js';



function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginSignUp />} />
          {isAuthenticated && <Route path='/account' element={<Profile user={user} />} />}
          {isAuthenticated && <Route path='/me/update' element={<UpdateProfile user={user} />} />}
          {isAuthenticated && <Route path='/password/update' element={<UpdatePassword user={user} />} />}
          {isAuthenticated && <Route path='/shipping' element={<Shipping />} />}
          {isAuthenticated && <Route path='/order/confirm' element={<ConfirmOrder user={user} />} />}
          {isAuthenticated && <Route path='/success' element={<OrderSuccess user={user} />} />}
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='/cart' element={<Cart />} />
          {isAuthenticated && stripeApiKey && <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)} ><Payment  user={user} /></Elements>} />}
        </Routes>
        {isAuthenticated && <DropdownComponent user={user} />}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
