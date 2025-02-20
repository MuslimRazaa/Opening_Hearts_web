import React, { useEffect, useState } from 'react'
import master from '../../media/images/master.png';
import paynieer from '../../media/images/poynier.png';
import square from '../../media/images/square.png';
import paypal from '../../media/images/paypal.png';
import stripes from '../../media/images/stripe.png';
import i from '../../media/images/i.png';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import right from '../../media/images/tic.png'
import Modal from '../../components/Layout/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { buyNowGetCart, order, orderService } from '../../utils/api';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISH_KEY } from '../../utils/api';
import Swal from 'sweetalert2';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

function ServiceBillingPage() {
    const [serviceByNowBillingPage, setServiceByNowBillingPage] = useState([]);
    const [serviceByNowBillingPagePrice, setServiceByNowBillingPagePrice] = useState([]);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

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

    const fetchBuyNowGetCart = async () => {
        setLoading(true)
        try {
            const response = await buyNowGetCart();
            setServiceByNowBillingPage(response?.data?.data?.cart[0]?.items[0]); // Adjust based on API response structure
            setServiceByNowBillingPagePrice(response?.data?.data); // Adjust based on API response structure

        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBuyNowGetCart();
    }, [])

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            toast.error(`Card information is missing, ${error.message}!`);
            return;
        }

        try {
            // Create a payment method with Stripe
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setError(error.message)
                setLoading(false)
                toast.error(`Order Faild, ${error.message}!`);
                return;
            }
            const data = {
                address: '',
                phone: "",
                latitude: '',
                longitude: '',
                payment_intent: paymentMethod?.id,
                web_type: 1,
            }
            const response = await orderService(data);
            setLoading(false)
            setError("")

            toast.success('Order Successful !');
            fetchBuyNowGetCart()
            navigate("/service")

        } catch (error) {
            setLoading(false)
            toast.error(`Order Faild ! ${error.message}`);

        }
    };


    return (
        <>
            <Header />
            <ToastContainer />
            <div className="container">
                <div className="billing-information-main-top">
                    <div className="row">
                        <div className="col-md-8">
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
                                            <Link to="/serviceBillingDetail" style={{ textDecoration: "none" }}> <button className="add-details-button">Add Details</button></Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="payment-options">
                                <h4>Payment Options</h4>
                            </div>

                            <div class="payment-label">
                                <label>
                                    <input type="radio" name="payment" id="credit-debit-card" />
                                    <span>Credits and Debits Card</span>
                                    <img src={paypal} alt="Visa" />
                                    <img src={master} alt="MasterCard" />
                                    <img src={square} alt="MasterCard" />
                                    <img src={paynieer} alt="MasterCard" />
                                    <img src={paypal} alt="PayPal" />
                                </label>
                            </div>
                            <div className="with-pay">
                                {/* Payment Form */}
                                <div className="payment-form-service-billing">
                                    <h2>Pay with</h2>
                                    <p className="payment-description">
                                        Credit or Debit card
                                    </p>
                                    <p className="payment-description2">
                                        Your payments are secured, Your details are confidential
                                    </p>
                                    <form className='payment-form-main-form' onSubmit={handleSubmit}>
                                        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                                            <CardElement options={cardElementOptions} />
                                        </div>
                                        {error && <p style={{ color: "red" }}>{error}</p>}
                                        <div className="shopping-cart-details-button" style={{ marginTop: "15px" }}>
                                            <button type="submit" disabled={!stripe || loading}>
                                                {loading ? <Spinner animation="border" role="statuss" size="sm" /> : "Pay Now"}
                                            </button>
                                        </div>
                                    </form>



                                    {/* <form>
                                        <div className="input-group">
                                            <input type="text" id="cardNumber" placeholder="Card Number" />
                                        </div>
                                        <div className="input-row">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    id="expirationDate"
                                                    placeholder="Expiration Date"
                                                />
                                            </div>
                                            <div className="input-group security">
                                                <input
                                                    type="password"
                                                    id="securityCode"
                                                    placeholder="Security Code"
                                                />
                                                <img src={i} className="security-i" />
                                            </div>
                                        </div>
                                        <div className="input-row">
                                            <div className="input-group">
                                                <input type="text" id="firstName" placeholder="First Name" />
                                            </div>
                                            <div className="input-group">
                                                <input type="text" id="lastName" placeholder="Last Name" />
                                            </div>
                                        </div>

                                        {/* {/ Save as Draft Checkbox /} 
                                    <div className="form-check">
                                        <input
                                            className="form-check-input "
                                            type="checkbox"
                                            id="saveDraft"
                                        />
                                        <label className="form-check-label checkbox-label" htmlFor="saveDraft">
                                            Saved as account draft
                                        </label>
                                    </div>
                                </form> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='shopping-cart-details'>
                                <div className='shopping-cart-details-title'>
                                    <h2>{serviceByNowBillingPage?.serviceplan?.plan_type}</h2>
                                    <h4 style={{ color: "#939393" }}>${serviceByNowBillingPagePrice?.subTotal}</h4>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        {/* <div className="shopping-cart-details-table-keys">
                                        <ul>
                                            <li style={{ color: "black" }}>Subtotal ( 1 service )</li>
                                        </ul>
                                    </div> */}
                                    </div>
                                    <div className="col-lg-6">
                                        {/* <div className="shopping-cart-details-table-values">
                                        <ul>
                                            <li style={{ color: "black" }}>${serviceByNowBillingPagePrice?.subTotal}</li>
                                        </ul>
                                    </div> */}
                                    </div>
                                </div>

                                {/* <div className="service-billing-promocode">
                                <input type="text" placeholder='Enter Promo Code' />
                            </div>
                            <div className="service-billing-services-chargers">
                                <input type="text" placeholder='Services Chargers' />
                            </div> */}
                                <div className="shopping-cart-details-sub-total">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h2>Sub Total</h2>
                                            {/* <h4>Delivery Time</h4> */}
                                        </div>
                                        <div className="col-lg-6">
                                            <h3 style={{ fontSize: "21px" }}>${serviceByNowBillingPagePrice?.subTotal}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping-cart-details-payment-cards">
                                    <img src={stripes} />
                                    {/* <img src={square} />
                                <img src={master} />
                                <img src={paynieer} />
                                <img src={paypal} />
                                <img src={paypal} />
                                <img src={master} /> */}

                                </div>
                                {/* <div className="shopping-cart-details-button">
                                <button onClick={handleConfirmClick} >Confirm and Pay</button>

                            </div> */}
                                {/* <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                                    <div className='modal-content-here'>
                                        <div className="modal-success-image">
                                            <img src={right} />
                                        </div>
                                        <div className="modal-content-title">
                                            <h2>Payment Success!</h2>
                                            <p>Your Order has been Sucessfully placed!</p>
                                        </div>
                                        <div className="modal-content-buttons">
                                            <div class="modal-content-button" >
                                                <Link to="" style={{ textDecoration: "none" }}><button>Details</button></Link>
                                            </div>
                                            <div class="modal-content-button">
                                                <Link to="/service" style={{ textDecoration: "none" }}> <button>Back To Home</button></Link>
                                            </div>
                                        </div>

                                    </div>
                                </Modal> */}
                            </div>

                            {/* Review Product & Shipping Section */}
                            {serviceByNowBillingPage &&
                                <div className="review-shipping">
                                    <h2>Review Product & Shipping</h2>
                                    <h2 className='cart-store-name'>{serviceByNowBillingPage?.service_product?.name}</h2>
                                    <div className="product-details">
                                        <img
                                            src={serviceByNowBillingPage?.service_product?.media[0]?.original_url}
                                            alt="Nike Dunk Low"
                                            className="product-image"
                                        />
                                        <div className="product-info">
                                            <h3>{serviceByNowBillingPage?.service_product?.title}</h3>
                                            <p className="product-price">
                                                <span className="discount-price">${serviceByNowBillingPagePrice?.subTotal}</span>{" "}
                                                <span className="original">Plan: {serviceByNowBillingPage?.serviceplan?.plan_type}</span>
                                            </p>
                                            {/* <div className="billing-info-colors">
                                        <p>Colours:</p><span className="billing-info-color-value"></span>
                                        <p>Size:</p> <span className="billing-info-size-value">M</span>
                                    </div>
                                    <p>QTY: 01</p> */}
                                        </div>
                                    </div>
                                    <div className="shipping-info">
                                        <h5>Delivery:</h5>
                                        <p>International Shipping from United Kingdom</p>
                                        <h5>Import Tax:</h5>
                                        <p>US $0.00</p>
                                    </div>
                                </div>}

                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </ >
    )
}

export default ServiceBillingPage