import React, { useEffect, useState } from 'react'
import stripeS from '../../media/images/stripe.png'
import square from '../../media/images/square.png'
import rightw from '../../media/images/tic.png'
import master from '../../media/images/master.png'
import paynieer from '../../media/images/poynier.png'
import paypal from '../../media/images/paypal.png'
import Modal from '../../components/Layout/Modal'
import CheckoutLeft from './CheckoutLeft'
import s1 from '../../media/images/s3.png'
import baseline from '../../media/images/ic_baseline-discount.png'
import right from '../../media/images/rarrow.png'
import { Link } from 'react-router-dom'
import BASE_URL, { buyNowGetCart, checkOutBothPrice, checkOutCart, checkOutServiceCart, order, STRIPE_PUBLISH_KEY } from '../../utils/api'

import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import i from '../../media/images/i.png'
import Swal from 'sweetalert2'
import { Spinner } from 'react-bootstrap'


const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);


function CheckoutSection2() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemPrices, setCartItemPrices] = useState();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [serviceCartItems, setServiceCartItems] = useState([]);

    const [error, setError] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    const cardElementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                "::placeholder": {
                    color: "#aab7c4",
                },
                padding: "14px",
            },
            invalid: {
                color: "#fa755a",
            },
        },
    };

    const fetchCartItems = async () => {
        setLoading2(true)
        try {
            const response = await checkOutCart();
            setCartItems(response?.data?.data?.seller_cart); // Update state with cart items
            setLoading2(false)
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setLoading2(false)
        }
    };


    const fetchServiceCartItems = async () => {
        setLoading2(true)
        try {
            const response = await checkOutServiceCart();
            setServiceCartItems(response?.data?.data?.cart); // Update state with cart items
            setLoading2(false)

        } catch (error) {
            setLoading2(false)
            console.error('Error fetching cart items:', error);
        }
    };

    const fetchCheckOutBothPrice = async () => {
        setLoading2(true)
        try {
            const response = await checkOutBothPrice();
            setCartItemPrices(response?.data?.data); // Update state with cart items
            setLoading2(false)
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setLoading2(false)

        }
    };
    const handleOrderNowClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("CardElement is null.");
            alert("Card information is missing.");
            return;
        }

        try {
            // Create a payment method with Stripe
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message);
                setLoading(false)
                // await Swal.fire({
                //     icon: 'error',
                //     text: `Order Faild, ${error.message}`,
                //     confirmButtonText: 'Back',
                // })
                return;
            }
            const data = {
                address: 'united',
                phone: "02231222123",
                latitude: '38.7946° N',
                longitude: '106.5348° W',
                payment_intent: paymentMethod?.id,
                web_type: 1,
            }
            const response = await order(data);
            setLoading(false)
            await Swal.fire({
                icon: 'success',
                text: 'Order Successful',
                confirmButtonText: 'Next',
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsModalVisible(true); // Show the modal when "Next" is clicked
                }
            });
            setError("");


        } catch (error) {
            setLoading(false)
            console.error("Error processing payment:", error);
            setError("");
            await Swal.fire({
                icon: 'error',
                text: `Order Faild`,
                confirmButtonText: 'Back',
            })
        }
    };

    useEffect(() => {
        fetchCartItems();
        fetchServiceCartItems();
        fetchCheckOutBothPrice();
    }, []);

    return (

        <div className='container'>
            <div className="ShoppingCartSectionTwo">
                <div className="row">
                    <div className="col-lg-8">
                        <h2 className='ss-cart-title'>Checkout</h2>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="payment-container">
                            <div className="shipping-details">
                                <h2>Shipping Details</h2>
                                <div className="full-name-checkout">
                                    <p>Full Name</p>
                                    <h5 className="checkout-fullname">Shipping USER NAME</h5>
                                </div>
                                <div className="phone-checkout">
                                    <p>Phone</p>
                                    <h5 className="checkout-phone">{'01-XXXX-XXXX'}</h5>
                                </div>
                                <div className="Address-checkout">
                                    <p>Address</p>
                                    <h5 className="checkout-Address">Shipping USER ADDRESS</h5>
                                </div>
                                <p className="checkout-change-address">Change Address</p>
                            </div>

                            <div className="payment-form">
                                <h2>Pay with</h2>
                                <p className="payment-description">Credit or Debit card</p>
                                <p className="payment-description2">
                                    Your payments are secured, Your details are confidential
                                </p>

                                <form className='payment-form-main-form' onSubmit={handleSubmit}>
                                    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                                        <CardElement options={cardElementOptions} />
                                    </div>
                                    {error && <p style={{color: "red"}}>{error}</p>}
                                    <div className="shopping-cart-details-button" style={{ marginTop: "15px" }}>
                                        <button type="submit" disabled={!stripe || loading}>
                                            {loading ? <Spinner animation="border" role="statuss" size="sm" /> : "Pay Now"}
                                        </button>
                                    </div>
                                </form>

                                <div className="add-billing-address">
                                    <h3>Billing Address</h3>
                                    <div className="d-flex align-items-center gap-20">
                                        <p>Jane Smith, 987 Maple Avenue, Springfield, IL 62704, USA</p>
                                        {/* <span className="edit-billing-address">Edit</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>





                        <div className="billing-container">
                            {/* Billing Information Section */}
                            <div className="billing-info">
                                <h2>Billing Information</h2>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <p>
                                            Boost brand exposure during our biggest sourcing events and online
                                            trade shows, including Super September and March Expo.
                                        </p>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="add-details-button">
                                            <Link to="/addBillingDetails" style={{ textDecoration: "none" }} ><button className="add-details-button">Add Details</button></Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* Payment Options Section */}
                            <div className="payment-options">
                                <label>
                                    <input type="radio" name="payment-method" /> Paypal
                                </label>
                                {/* <label>
                                    <input type="radio" name="payment-method" /> Google pay
                                </label>
                                <label>
                                    <input type="radio" name="payment-method" /> Apple pay
                                </label> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* <CheckoutRight /> */}
                        <div className='shopping-cart-details'>
                            <div className='shopping-cart-details-title'>
                                <h2>Price Before Shipping</h2>
                                <h4>{loading2 ? <Spinner animation="border" role="status" /> : "$" + cartItemPrices?.subtotal}</h4>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="shopping-cart-details-table-keys">
                                        <ul>
                                            <li style={{ color: "black" }}>Subtotal</li>
                                            <li>Discount</li>
                                            {/* <li>Import Tax</li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="shopping-cart-details-table-values">
                                        <ul>
                                            <li style={{ color: "black" }}>{loading2 ? <Spinner animation="border" role="status" /> : "$" + cartItemPrices?.subtotal}</li>
                                            <li>{cartItemPrices?.discount}</li>
                                            {/* <li>${cartItemPrices?.tax}</li> */}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <div className="shopping-cart-details-shipping">
                                <h2>Shipping:</h2>
                                <p>US $22.00 Expedited International Shipping. See details for shipping
                                    International shipment of items may be subject to customs processing and additional charges</p>
                            </div>
                            <div className="shopping-cart-details-sub-total">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h2>Sub Total</h2>
                                    </div>
                                    <div className="col-lg-6">
                                        <h3>${cartItemPrices?.subtotal}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="shopping-cart-details-payment-cards" style={{ justifyContent: "left" }}>
                                <img src={stripeS} />
                                {/* <img src={square} />
                                <img src={master} />
                                <img src={paynieer} />
                                <img src={paypal} />
                                <img src={paypal} />
                                <img src={master} /> */}

                            </div>
                            {/* <div className="shopping-cart-details-button">
                                <button onClick={handleOrderNowClick} >Order Now</button>
                                  {clientSecret && <Elements stripe={stripePromise} options={{clientSecret}}>
                                        <div className="stripe-payment-container">
                                            <PaymentElement id="payment-element" />
                                        </div>
                                    </Elements>}
                            </div> */}
                            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                                <div className='modal-content-here'>
                                    <div className="modal-success-image">
                                        <img src={rightw} />
                                    </div>
                                    <div className="modal-content-title">
                                        <h2>Order Success!</h2>
                                        <p>Your Order has been Sucessfully placed!</p>
                                    </div>
                                    <div className="modal-content-buttons">
                                        <div class="modal-content-button" >
                                            <Link to="/orderTracking" style={{ textDecoration: "none" }}><button>Order Track</button></Link>
                                        </div>
                                        <div class="modal-content-button">
                                            <Link to="/featureProduct" style={{ textDecoration: "none" }}> <button>Back To Home</button></Link>
                                        </div>
                                    </div>

                                </div>
                            </Modal>
                        </div>


                        {loading2 ? <div className='centered-spinner'>
                            <Spinner animation="border" role="status" />
                        </div>
                            :
                            <div className='cart-y-scroll'>
                                {/* Review Product & Shipping Section */}
                                {cartItems?.map((cart, index) => (
                                    <div className="review-shipping" key={index}>
                                        <h2>Review Product & Shipping</h2>
                                        <h2 className='cart-store-name'>{cart?.name}</h2>
                                        {cart?.cart.map((item, index) => (
                                            <div className="product-details">
                                                <img
                                                    src={item?.product?.media[0]?.original_url}
                                                    alt="Nike Dunk Low"
                                                    className="product-image"
                                                />
                                                <div className="product-info">
                                                    <h3>{item?.product?.title}</h3>
                                                    <p className="product-price">
                                                        <span className="discount-price">${item?.product?.discount_price > 0 ? item?.product?.discount_price : item?.product?.price}</span>{" "}
                                                        <span className="original-price">${item?.product?.price}</span>
                                                    </p>
                                                    {/* <div className="billing-info-colors">
                                        <p>Colours:</p><span className="billing-info-color-value"></span>
                                        <p>Size:</p> <span className="billing-info-size-value">M</span>
                                    </div>
                                    <p>QTY: 01</p> */}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="shipping-info">
                                            <h5>Delivery:</h5>
                                            <p>International Shipping from United Kingdom</p>
                                            <h5>Import Tax:</h5>
                                            <p>US $0.00</p>
                                        </div>
                                    </div>
                                ))}

                                {serviceCartItems?.map((cart, index) => (
                                    <div className="review-shipping" key={index}>
                                        <h2>Review Services</h2>
                                        <h2 className='cart-store-name'>{cart?.name}</h2>
                                        {cart?.items.map((item, index) => (
                                            <div className="product-details">
                                                <img
                                                    src={item?.service_product?.media[0]?.original_url}
                                                    alt="Nike Dunk Low"
                                                    className="product-image"
                                                />
                                                <div className="product-info">
                                                    <h3>{item?.service_product?.name}</h3>
                                                    <p className="product-price">
                                                        <span className="discount-price">${item?.price}</span>{" "}
                                                        <span className="original-plan">Plan: {item?.serviceplan?.plan_type || "NA"}</span>
                                                    </p>
                                                    {/* <div className="billing-info-colors">
                                        <p>Colours:</p><span className="billing-info-color-value"></span>
                                        <p>Size:</p> <span className="billing-info-size-value">M</span>
                                    </div>
                                    <p>QTY: 01</p> */}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="shipping-info">

                                        </div>
                                    </div>
                                ))}
                            </div>}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="applied-discount">
                        <p>Applied Discount</p>
                        <div className="applied-discount-icon">
                            <img src={baseline} />
                        </div>
                        <div className="applied-discount-right-icon">
                            <img src={right} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSection2
