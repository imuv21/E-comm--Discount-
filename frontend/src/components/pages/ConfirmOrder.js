import "../Style.css";
import React, { Fragment } from "react";
import CheckoutSteps from "../layout/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard";


const ConfirmOrder = () => {

    const { loading } = useSelector((state) => state.user);
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/payment");
    };



    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>

                        <MetaData title="Confirm Order" />
                        <div className="sup-dup-products2">
                            <CheckoutSteps activeStep={1} />

                            <h2 className="homeHeading3 mauto">Confirm Order</h2>
                            <div className='cart'>
                                <div className='cartProducts'>
                                    <div className="userdetail">
                                        <h2>Shipping Info : </h2>
                                        <div><p>Name :</p> <p>Uttam Verma</p></div>
                                        <div><p>Phone :</p> <p>9868678673</p></div>
                                        <div><p>Address :</p> <p>newyork, california, usa</p></div>
                                        <h2>Your Cart Items :</h2>
                                    </div>
                                    {cartItems && cartItems.map((item) => (
                                        <CartItemCard item={item} showDiv={false} />
                                    ))}
                                </div>
                                <div className='subtotal'>
                                    <p>Subtotal ({cartItems.length} items): {`₹${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                                    <p>Delivery Charges :  ₹{shippingCharges}</p>
                                    <p>GST : ₹{tax}</p>
                                    <h3>Total : ₹{totalPrice}</h3>
                                    <button onClick={proceedToPayment} className='checkout_btn'>Proceed To Payment</button>
                                </div>
                            </div>
                        </div>

                    </Fragment>
            }
        </Fragment>
    )
}

export default ConfirmOrder;