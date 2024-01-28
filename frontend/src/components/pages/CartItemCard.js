
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';


const CartItemCard = ({ item, showDiv }) => {

  const dispatch = useDispatch();

  const incQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const decQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <div className='cartitem' key={item.product}>
      <div className="cart_img">
        <img src={item.image} alt='img' />
      </div>
      <div className="details">
        <Link to={`/product/${item.product}`} className='cart_name'>{item.name}</Link>
        <p className='cart_price'>{`price: ₹${item.price}`}</p>
        <button onClick={() => deleteCartItems(item.product)} className='remove_btn'>Remove</button>
      </div>
      <div className='details2'>
        {showDiv &&
          <div className='detailsBlock-11'>
            <button className='pmbtn2' onClick={() => decQuantity(item.product, item.quantity)}>-</button>
            <input value={item.quantity} readOnly type='number' />
            <button className='pmbtn2' onClick={() => incQuantity(item.product, item.quantity, item.stock)}>+</button>
          </div>
        }

        <p>{`Subtotal: ₹${item.price * item.quantity}`}</p>
      </div>
    </div>
  )
}

export default CartItemCard