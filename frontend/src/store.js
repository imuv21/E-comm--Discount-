import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer } from './reducers/productReducer';
import { profileReducer, userReducer, forgotPasswordReducer } from './reducers/userResucer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer } from './reducers/orderReducer';

const rootReducer = combineReducers({ products: productReducer, productDetails: productDetailsReducer, user: userReducer,
   profile: profileReducer, forgotPassword: forgotPasswordReducer, cart: cartReducer, newOrder: newOrderReducer });


let initialState={
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse( localStorage.getItem("shippingInfo")) : []
  },
};
const middleware = [thunk];
//const storee = configureStore( reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const store = configureStore({
    reducer: rootReducer, // Pass the root reducer as a property of the object
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: composeWithDevTools(),
    preloadedState: initialState,
  });

export default store;