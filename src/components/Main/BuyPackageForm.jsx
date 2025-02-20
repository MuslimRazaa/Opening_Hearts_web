import React, { useEffect, useState } from 'react'
import visa from '../../media/images/Tem_Images/visa.svg';
import mastercard from '../../media/images/Tem_Images/mastercard.svg';
import paypal from '../../media/images/Tem_Images/paypal.svg';
import discover from '../../media/images/Tem_Images/discover.svg';
import right from '../../media/images/tic.png'
import amex from '../../media/images/Tem_Images/amex.svg';
import i from '../../media/images/i.png';
import questionmark from '../../media/images/icon-mark.svg';
import Modal from '../Layout/Modal';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoadingComponents from '../shared/loaders/LoadingComponents';
import Swal from 'sweetalert2';
import apis from '../../service';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Form from "react-bootstrap/Form";

const stripePromise = loadStripe('pk_test_51HiCo6EHLDkHxi1YwwTc185yQTBuRIZktAiqLEus7vFq1kKxsrir4UlAUVCP6rRokopLAFCYY1DKowhrjZuLhyv200gfW8PqZc');

const PaymentForm = ({ type, planId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const loginUserData = localStorage.getItem('user_data');
    const userData = JSON.parse(loginUserData);
    const email = userData?.email;
    // const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [cardError, setCardError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        companey_name: "",
        street_address: "",
        aparment: "",
        town: "",
        phone_number: "",
        email: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { email },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        const formData = {
            plan_id: planId,
            payment_method: paymentMethod.id,
            type: type
        }

        try {
            const response = await apis.buySubscription(formData);
            localStorage.setItem('user_data', JSON.stringify(response?.data?.data))
            if (type === "product") {
                navigate('/dashboard/product')
            } else {
                navigate('/dashboard/service')
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
        setLoading(false);
    };

    const handleCardChange = (event) => {
        if (event.error) {
            setCardError(event.error.message)
        } else {
            setCardError('')
        }
    };

    return (

        <Form onSubmit={handleSubmit}>
            <div className="card-element-container">
                <CardElement className="card-element" options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#000',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                    hidePostalCode: true,
                }}
                    onChange={handleCardChange}
                />
                <p className="input-error-show">{cardError}</p>
            </div>
            <div className="cart-button-btn-cpn cart-button-btn-div  cart-button-btn-div01">
                <button className='proceedCheckout3 mt-2' type="submit" disabled={!stripe || loading}>
                    {loading ? 'Loading...' : 'Confirm & Pay'}
                </button>
            </div>
        </Form>
    );
};


function BuyPackageForm() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const type = params.get('type');
    const planId = params.get('planId');
    const [subscription, setSubscription] = useState("");
    const [loader, setLoader] = useState(true);
    const handleOrderNowClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const subscriptionPlanById = async (planId) => {
        try {
            const response = await apis.subscriptionPlanById(planId);
            setSubscription(response?.data?.data)
            setLoader(false)
        } catch (error) {
            setLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    useEffect(() => {
        subscriptionPlanById(planId)
    }, [planId])
    return (
        <>
            {loader ?
                <LoadingComponents />
                :
                <div className='main-buy-packages'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="buy-package-head">
                                    <h1>Buy Package</h1>
                                    <p>You need to buy Package before become a {type === "product" ? "Seller" : "service provider"}.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                {/* <div className="billing-information-main">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="billing-information-text">
                                        <h3>Billing Information</h3>
                                        <p>Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo. </p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="billing-information-button">
                                        <div class="f-service-detail-page-top-button"><button style={{ fontSize: "19px" }}>Add Details</button></div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                                {/* <div className="payment-options">
                            <h4>Payment Options</h4>
                        </div>
                        <div class="payment-label">
                            <label>
                                <input type="radio" name="payment" id="credit-debit-card" />
                                <span>Credits and Debits Card</span>
                                <img src={visa} alt="Visa" />
                                <img src={mastercard} alt="MasterCard" />
                                <img src={paypal} alt="PayPal" />
                                <img src={discover} alt="Discover" />
                                <img src={amex} alt="Amex" />
                            </label>
                        </div> */}
                                <div className="with-pay">
                                    <div className="payment-container">
                                        <h4>Pay with</h4>
                                        <p className="mb-2">
                                            <small>Credit or Debit card</small>
                                        </p>
                                        <p>
                                            <small style={{ fontWeight: '500', color: '#848484' }}>Your payments are secured, Your details are confidential.</small>
                                        </p>
                                        <div className="stripe-payment-card">
                                            <Elements stripe={stripePromise}>
                                                <PaymentForm type={type} planId={planId} />
                                            </Elements>
                                        </div>
                                        {/* <form>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control input-field"
                                                    id="cardNumber"
                                                    placeholder="Card Number"
                                                />
                                            </div>
                                            <div className="row">
                                        <div className="col-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control input-field"
                                                id=""
                                                placeholder="Expiration Date"
                                            />
                                        </div>
                                        <div className="col-6 mb-3">

                                            <div className="security">
                                                <input
                                                    type="text"
                                                    className="form-control input-field"
                                                    id=""
                                                    placeholder="Security Code"
                                                />

                                                <img src={i} alt="" className='img_i' srcset="" />
                                            </div>


                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control input-field"
                                                id=""
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <input
                                                type="text"
                                                className="form-control input-field"
                                                id=""
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
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
                                <div className="price_strip_sec">
                                    <div>

                                        <div className="basic-text">
                                            <h2>Plan {subscription?.name}</h2>
                                            <p><small>${subscription?.price}</small></p>
                                            <div className="set-disply">
                                                <p>Subtotal ({type === "product" ? "Product" : "Seller"} Account Subscription)</p>
                                                <small>${subscription?.price}</small>
                                            </div>
                                        </div>

                                        <div className="promo-code-main" style={{ borderBottom: '1px solid #6B6767' }}>
                                            {/* <input type="text" placeholder='Enter Promo Code' className='promo-class' />
                                    <img src={questionmark} className='question-icon' alt="" /> */}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="sub-main">
                                            <div className="text-sub-price">
                                                <p>Sub Total</p>
                                                <h3>${subscription?.price}</h3>
                                            </div>
                                            <div className="img-payment">
                                                <img src={visa} alt="Visa" />
                                                <img src={mastercard} alt="MasterCard" />
                                                <img src={paypal} alt="PayPal" />
                                                <img src={discover} alt="Discover" />
                                                <img src={amex} alt="Amex" />
                                                <img src={paypal} alt="PayPal" />
                                                <img src={visa} alt="Visa" />
                                                <img src={mastercard} alt="MasterCard" />
                                                <img src={amex} alt="Amex" />
                                            </div>

                                            {/* <div className="confirm-and-pay">
                                                <button className='btn btn-confirmpay' onClick={handleOrderNowClick}>Confirm and Pay</button>
                                            </div> */}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                        <div className='modal-content-here'>
                            <div className="modal-success-image">
                                <img src={right} />
                            </div>
                            <div className="modal-content-title">
                                <h2>Congratulation!</h2>
                                <p>Your are now Successfully Registered as Seller!</p>
                            </div>
                            <div className="modal-content-buttons">
                                <div class="modal-content-button">
                                    <Link to="" style={{ textDecoration: "none" }}> <button>Start your jouney</button></Link>
                                </div>
                            </div>

                        </div>
                    </Modal>
                </div>
            }
        </>
    )
}

export default BuyPackageForm
