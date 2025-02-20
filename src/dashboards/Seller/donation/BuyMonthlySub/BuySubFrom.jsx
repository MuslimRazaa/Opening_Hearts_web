import React, { useState } from 'react'
import visa from '../../../../media/images/Tem_Images/visa.svg';
import mastercard from '../../../../media/images/Tem_Images/mastercard.svg';
import paypal from '../../../../media/images/Tem_Images/paypal.svg';
import discover from '../../../../media/images/Tem_Images/discover.svg';
import right from '../../../../media/images/tic.png'
import amex from '../../../../media/images/Tem_Images/amex.svg';
import i from '../../../../media/images/i.png';
import questionmark from '../../../../media/images/icon-mark.svg';
import Modal from '../../../../components/Layout/Modal';
import { Link } from 'react-router-dom';

const BuySubFrom = ({heading, link, verification}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOrderNowClick = () => {
      setIsModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
    };
  return (
    <div className='main-buy-packages'>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="buy-package-head">
                    <h1>
                    {heading ? heading : 
                    "Buy Monthly Subscription"}
                    </h1>
                    <p>You need to buy subscription before become an Organization.</p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-8">
                <div className="billing-information-main">
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
                </div>
                <div className="payment-options">
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
                </div>
                <div className="with-pay">
                    <div className="payment-container">
                        <h4>Pay with</h4>
                        <p className="mb-2">
                            <small>Credit or Debit card</small>
                        </p>
                        <p>
                            <small style={{ fontWeight: '500', color: '#848484' }}>Your payments are secured, Your details are confidential.</small>
                        </p>

                        <form>
                            {/* Card Number */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control input-field"
                                    id="cardNumber"
                                    placeholder="Card Number"
                                />
                            </div>

                            {/* Expiration Date and Security Code */}
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

                            {/* First Name and Last Name */}
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

                            {/* Save as Draft Checkbox */}
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
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="price_strip_sec">
                    <div>

                        <div className="basic-text">
                            <h2>Basic</h2>
                            <p>
                                <small>$50.00</small>
                            </p>
                            <div className="set-disply">
                                <p>Subtotal (Seller Account Subscription)</p>
                                <small>$50</small>
                            </div>
                        </div>

                        <div className="promo-code-main">
                            <input type="text" placeholder='Enter Promo Code' className='promo-class' />
                            <img src={questionmark} className='question-icon' alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="sub-main">
                            <div className="text-sub-price">
                                <p>Sub Total</p>
                                <h3>$ 00.00</h3>
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

                            <div className="confirm-and-pay">
                                {verification ? <Link to="/email-verfication-donation" ><button className='btn btn-confirmpay' >Confirm and Pay</button></Link> :
                                <button className='btn btn-confirmpay' onClick={handleOrderNowClick}>Confirm and Pay</button>}
                            </div>
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
                <h2>Payment Successful</h2>
               
                </div>
            <div className="modal-content-buttons">
                <div class="modal-content-button">
                    <Link to={link ? "" : "/donation-dashboard/donation-dashboard-start" } style={{ textDecoration: "none" }}> <button>Start your jouney</button></Link>
                </div>
            </div>

        </div>
    </Modal>
</div>
  )
}

export default BuySubFrom
