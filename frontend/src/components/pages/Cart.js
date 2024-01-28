import '../Style.css';
import React, { Fragment } from 'react';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import CartItemCard from './CartItemCard';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';



const Cart = () => {

    const navigate = useNavigate();
    const { cartItems, loading } = useSelector((state) => state.cart);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    const shippingCharges = subtotal > 5000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;



    const checkoutHandler = () => {
        navigate("/shipping");
    };

    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <MetaData title="Cart" />
                        <div className='sup-dup-products'>
                            <h2 className='homeHeading mauto'>Cart</h2>
                            {cartItems.length === 0 ? 
                            <div className='nopro'>
                                <RemoveShoppingCartIcon />
                                <p className='norev2'>No Products Yet</p>
                                <Link to="/products">Start Shopping</Link>
                            </div> :
                                <div className='cart'>
                                    <div className='cartProducts'>
                                        {cartItems && cartItems.map((item) => (
                                            <CartItemCard item={item} showDiv={true} />
                                        ))}
                                    </div>
                                    <div className='subtotal'>
                                        <p>Subtotal ({cartItems.length} items): {`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                                        <p>Delivery Charges :  ₹{shippingCharges}</p>
                                        <p>GST : ₹{tax}</p>
                                        <h3>Total : ₹{totalPrice}</h3>
                                        <button onClick={checkoutHandler} className='checkout_btn'>Proceed To Buy</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Cart;