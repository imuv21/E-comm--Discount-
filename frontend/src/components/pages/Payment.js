import '../Style.css';
import React, { Fragment, useEffect, useRef } from 'react';
import MetaData from '../layout/MetaData';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../layout/CheckoutSteps';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { CardNumberElement, CardCvcElement, useStripe, useElements, CardExpiryElement } from '@stripe/react-stripe-js';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {  createOrder, clearErrors } from '../../actions/orderAction';

const Payment = () => {

   
    const { loading, shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);
  //  const { error } = useSelector((state) => state.newOrder);
    const navigate = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo, orderItems: cartItems, itemsPrice: orderInfo.subtotal, 
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        payBtn.current.disabled = true;
        try{
            const config = {
                headers : {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config);
            const client_secret = data.client_secret;
            if(!stripe || elements) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name, 
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentinfo={
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };
                    dispatch(createOrder(order));
                    navigate("/success");
                }else{
                    alert.error("There's some issue while processing payment");
                }
            }

        }catch(error){
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(()=>{
        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);


    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <MetaData title="Payment" />
                        <div className="sup-dup-products2">
                            <CheckoutSteps activeStep={2} />
                            <div className="shippingBox">
                                 <h2 className="homeHeading2 mauto">Payment</h2>
                                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                                    <div className='logindiv'>
                                        <CreditCardIcon className='paymentsvg'/>
                                        <CardNumberElement className="paymentInput" />
                                    </div>
                                    <div className='logindiv'>
                                        <EventIcon  className='paymentsvg'/>
                                        <CardExpiryElement className="paymentInput" />
                                    </div>
                                    <div className='logindiv'>
                                        <VpnKeyIcon className='paymentsvg'/>
                                        <CardCvcElement className="paymentInput" />
                                    </div>
                                    <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className="loginBtn" />
                                </form>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Payment