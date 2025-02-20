import React, { useEffect, useState } from 'react'
import emergencycardimg from '../../../media/images/emergencycard.png'
import Toogle from '../../../components/Main/Toogle'
import i from '../../../media/images/i.png';
import visa from '../../../media/images/Tem_Images/visa.svg';
import mastercard from '../../../media/images/Tem_Images/mastercard.svg';
import paypal from '../../../media/images/Tem_Images/paypal.svg';
import discover from '../../../media/images/Tem_Images/discover.svg';
import amex from '../../../media/images/Tem_Images/amex.svg';
import Modal from '../../../components/Layout/Modal';
import right from '../../../media/images/tic.png'
import { Link, useLocation } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { DonationCheckout, getCampaign } from '../../../utils/api';

function DonateFormSec() {
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [donationAmount, setDonationAmount] = useState(false);
    const [token, setToken] = useState();
    const [monthly, setMonthly] = useState();
    const [campaignDetailPage, setCampaignDetailPage] = useState();
    const [loading2, setLoading2] = useState(false);
    const [error, setError] = useState("");





    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('amount');
    const type = queryParams.get('type');
    const id = queryParams.get('data');


    const fetchCampaignDetail = async () => {
        setLoading2(true)
        try {
            const response = await getCampaign(id);
            setCampaignDetailPage(response?.data?.data); // Adjust based on API response structure
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading2(false)
        }
    };

    useEffect(() => {
        fetchCampaignDetail();
    }, []);



    useEffect(() => {
        if (type) {
            setChecked("")
        }
    }, [])

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


    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (!stripe || !elements) {
            console.error("Stripe.js has not been initialized.");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("CardElement is null.");
            alert("Card information is missing.");
            setLoading(false);
            return;
        }

        try {
            // Create payment method
            const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            // Generate token
            const { token, error: tokenError } = await stripe.createToken(cardElement);

            // Handle errors
            if (paymentError || tokenError) {
                const errorMessage = paymentError?.message || tokenError?.message;
                setLoading(false);
                await Swal.fire({
                    icon: 'error',
                    text: `Order Failed, ${errorMessage}`,
                    confirmButtonText: 'Back',
                });
                console.error("Payment or Token Error:", { paymentError, tokenError });
                return;
            }

            // Construct data object
            const data = {
                store_id: campaignDetailPage?.company?.id,
                campaign_id: campaignDetailPage?.id,
                amount: amount ? amount :
                    donationAmount ? donationAmount : "",
                payment_type: checked || type == 0 ? 0 : 1,
                ...(checked || type == 0
                    ? { stripe_token: token.id }
                    : { currency: "USD", payment_intent: paymentMethod?.id }),
            };

            // Call backend API
            const response = await DonationCheckout(data);
            setLoading(false);
            setError("")
            // Show success message
            await Swal.fire({
                icon: 'success',
                text: 'Order Successful',
                confirmButtonText: 'Next',
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsModalVisible(true);
                }
            });
        } catch (error) {
            setError(error.message)
            // setLoading(false);
            // console.error("Error processing payment:", error);
            // await Swal.fire({
            //     icon: 'error',
            //     text: `Order Failed`,
            //     confirmButtonText: 'Back',
            // });
        }
    };


    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleConfirmClick = () => {
        setIsModalVisible(true);
    }
    const handleDonationAmount = (e) => {
        setDonationAmount(e.target.value);
    }



    return (
        <>
            <div className='donate-form-sec'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="emergency-fund-card">
                                <img src={campaignDetailPage?.cover_image} alt="" />
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <div className="emergency-fund-text">
                                            <h3>
                                                Donate Emergency Fund{" "}
                                            </h3>
                                            {type ?
                                                <div style={{ color: "green", fontSize: "20px", fontFamily: "cairoB" }}>
                                                    {type == 0 ? (
                                                        <button className="side-donate-once">Donate Monthly</button>
                                                    ) : (
                                                        <button className="side-donate-once">Donate Once</button>
                                                    )}
                                                </div>
                                                :
                                                <div className="toggle-sys">
                                                    <p>One time</p>
                                                    <Toogle
                                                        isOn={checked}
                                                        handleToggle={() => setChecked(!checked)}
                                                        colorOne="#EF476F"
                                                        colorTwo="#06D6A0"
                                                    />
                                                    <p>Monthly</p>
                                                </div>}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="emergency-fund-dolortext">
                                            <input type='number' value={amount ? amount : donationAmount} placeholder='eg: 30$' onChange={(e) => handleDonationAmount(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <hr style={{ width: '85%', margin: '0 auto', paddingBottom: '10px' }} />
                                    <div className="col-md-12">
                                        <div className="total-donate-price">
                                            <p>Total:</p>
                                            <p>${amount ? amount : donationAmount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="with-pay">
                                <div className="payment-container">
                                    <h2>{campaignDetailPage?.name}</h2>
                                    <h4>Pay with</h4>
                                    <p className="mb-2">
                                        <small>Credit or Debit card</small>
                                    </p>
                                    <p>
                                        <small style={{ fontWeight: '500', color: '#848484' }}>Your payments are secured, Your details are confidential.</small>
                                    </p>
                                    <div className="img-payment-donate-form">
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
                                    <br></br>
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
                                                placeholder="CVV"
                                            />

                                            <img src={i} alt=""  className='img_i' srcset="" />
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

                                   
                                </form> */}




                                    <div class="donate-and-pay">
                                        {/* <button class="btn btn-donatenow" onClick={handleConfirmClick}>Donate</button> */}
                                        <p>Remember this card for the future</p>
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
                                <h2>Thank You for Donating!</h2>
                            </div>
                            <div className="modal-content-buttons">
                                <div class="modal-content-button">
                                    <Link to="/donate-form" style={{ textDecoration: "none" }}> <button onClick={handleCloseModal}>Donate Again</button></Link>
                                </div>
                            </div>

                        </div>
                    </Modal>
                </div>

            </div>
        </>
    )
}

export default DonateFormSec
