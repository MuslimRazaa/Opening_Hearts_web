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
import { Link, useNavigate } from 'react-router-dom';
import BillingDetailsForm from '../AddBillingDetails/BillingDetailsForm';

function ServiceBillingDetailPage() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate()

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleConfirmClick = () => {
        setIsModalVisible(true);
        // navigate('/serviceBilling')
    }
    return (
        <div>
            <Header />
            <div className="container m-10">
                <div className="row">
                    <div className="col-lg-8">
                        <h2 className="billing-title">Billing Details</h2>
                    </div>
                    <div className="col-lg-4"></div>
                    <div className="col-md-8">
                        <div className="billing-details-container">
                            <form className="billing-form">
                                <div className="name-email-billing">
                                    <input type="text" placeholder="First Name*" required style={{ width: "80%" }} />
                                    <input type="text" placeholder="Last Name*" required style={{ width: "80%" }} />
                                </div>
                                <input type="email" placeholder="Email*" required />
                                <input type="text" placeholder="Street Address*" required />
                                <div className="city-zip-billing">
                                    <input type="text" placeholder="City*" required style={{ width: "80%" }} />
                                    <input type="text" placeholder="Zip Code*" required style={{ width: "80%" }} />
                                </div>
                                <input type="text" placeholder="Phone Number*" required />
                                <div className="save-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <p>Save this information for faster check-out next time</p>
                                </div>
                           <button type="submit" className="confirm-button" onClick={handleConfirmClick}>
                                    Confirm
                                </button>
                            </form>
                        </div>                        </div>
                    <div className="col-md-4">
                        <div className='shopping-cart-details'>
                            <div className='shopping-cart-details-title' style={{ paddingBottom: "18px" }}>
                                <h2>Basic</h2>
                                <h4 style={{ color: "#939393" }}>$38.99</h4>
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
                                <input type="text" placeholder='Enter Promo Code' />
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
                                        <h3 style={{ fontSize: "21px" }}>$ 68.98</h3>
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
                            <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                                <div className='modal-content-here'>
                                    <div className="modal-success-image">
                                        <img src={right} />
                                    </div>
                                    <div className="modal-content-title">
                                        <h2>Successfully Added!</h2>
                                    </div>
                                    <div className="modal-content-buttons">
                                        <div class="modal-content-button">
                                            <Link to="/serviceBilling" style={{ textDecoration: "none" }}> <button>Back</button></Link>
                                        </div>
                                    </div>

                                </div>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div >
            <Footer />
        </div>
    )
}

export default ServiceBillingDetailPage
