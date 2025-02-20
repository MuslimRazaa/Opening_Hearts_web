import React, { useState } from 'react'
import master from '../../media/images/master.png';
import paynieer from '../../media/images/poynier.png';
import square from '../../media/images/square.png';
import paypal from '../../media/images/paypal.png';
import stripe from '../../media/images/stripe.png';
import i from '../../media/images/i.png';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import right from '../../media/images/tic.png'
import Modal from '../../components/Layout/Modal';
import { Link } from 'react-router-dom';

function ServiceBillingPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCloseModal = () => {
      setIsModalVisible(false);
    };

    const handleConfirmClick =() =>{
        setIsModalVisible(true);
    }



    return (
        <>
            <Header />
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
                                            <Link to="/serviceBillingDetail"  style={{textDecoration:"none"}}> <button className="add-details-button">Add Details</button></Link> 
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
                                    <form>
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

                                        {/* {/ Save as Draft Checkbox /} */}
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
                            <div className='shopping-cart-details'>
                                <div className='shopping-cart-details-title' style={{paddingBottom:"18px"}}>
                                    <h2>Basic</h2>
                                    <h4 style={{color:"#939393"}}>$38.99</h4>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="shopping-cart-details-table-keys">
                                            <ul>
                                                <li style={{ color: "black" }}>Subtotal ( 1 service )</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="shopping-cart-details-table-values">
                                            <ul>
                                                <li style={{ color: "black" }}>$38.99</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="service-billing-promocode">
                                    <input type="text" placeholder='Enter Promo Code'/>
                                </div>
                                <div className="service-billing-services-chargers">
                                    <input type="text" placeholder='Services Chargers' />
                                </div>
                                <div className="shopping-cart-details-sub-total">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h2>Sub Total</h2>
                                            <h4>Delivery Time</h4>
                                        </div>
                                        <div className="col-lg-6">
                                            <h3 style={{fontSize: "21px"}}>$ 68.98</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="shopping-cart-details-payment-cards">
                                    <img src={stripe} />
                                    <img src={square} />
                                    <img src={master} />
                                    <img src={paynieer} />
                                    <img src={paypal} />
                                    <img src={paypal} />
                                    <img src={master} />

                                </div>
                                <div className="shopping-cart-details-button">
                                    <button onClick={handleConfirmClick} >Confirm and Pay</button>
                                    
                                </div>
                                <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
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
                                </Modal>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </ >
    )
}

export default ServiceBillingPage