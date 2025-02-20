import React, { useState } from 'react'
import Header from '../../../components/Layout/Header'
import map from '../../../media/images/🌎 Map Maker_ Washington, (Standard).png'
import user from '../../../media/images/methewSmall.png'
import flag from '../../../media/images/Argentina (AR).png'
import chat from '../../../media/images/chat.png'
import star from '../../../media/images/star.svg'
import right from '../../../media/images/tic.png'

import c1 from '../../../media/images/master.png'
import c2 from '../../../media/images/square.png'
import c3 from '../../../media/images/stripe.png'
import c4 from '../../../media/images/paypal.png'
import Footer from '../../../components/Layout/Footer'
import { Link } from 'react-router-dom'
import Modal from '../../../components/Layout/Modal'


function ConfirmAppointment() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);  // modal 2

    
    const handleOrderNowClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleOrderNowClick2 = () => {
        setIsModalVisible2(true);
        setIsModalVisible(false);
    };

    const handleCloseModal2 = () => {
        setIsModalVisible2(false);
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="confirm-appointment-wrapper">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="map-image">
                                <img src={map} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="appointment-top-right-wrapper">

                                <div className="appointment-mathew-profile">
                                    <div className="appointment-profile-picture">
                                        <img src={user} />
                                    </div>
                                    <div className="appointment-name">
                                        <div className="appointment-name-flag">
                                            <h4>Methew</h4>
                                            <img src={flag} />
                                        </div>

                                        <div className="appointment-star-rating">
                                            <img src={star} />
                                            <p>4.9 <span style={{ fontSize: "12px", color: "gray" }}>/5 (78)</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="appointment-chat">
                                    <img src={chat} alt="Chat Icon" className="chat-icon" />
                                    <p className="chat-text">Chat with Mathew</p>
                                </div>
                                <div className="appointment-price">
                                    <p>$10/hr</p>

                                </div>

                            </div>
                            <div className="payment-options-appointment-page">
                                <h2>Payment Options</h2>
                            </div>
                            <div className="credit-card-appointment-page">
                                <label class="custom-checkbox">
                                    <input type="checkbox" />
                                    <span class="checkmark"></span>
                                </label>
                                <p>Credits and Debits Card</p>
                                <div className="credit-card-icons-appointment-page">
                                    <img src={c1} />
                                    <img src={c2} />
                                    <img src={c3} />
                                    <img src={c4} />
                                </div>
                            </div>
                            <div className="service-charges-appointment-page-wrapper">
                                <div className="service-cahrges-appointment">
                                    <h3>Services Chargers</h3>
                                    <div className='question-mark-appointment' >
                                        ?
                                    </div>
                                </div>
                                <div className="service-charges-price">
                                    <h3>$2.99</h3>
                                </div>
                            </div>
                            <div className="sub-total-appointment-page">
                                <div className="sub-total-appointment">
                                    <h3>Sub Total</h3>
                                </div>
                                <div className="sub-total-price">
                                    <h3>$12.99</h3>
                                </div>
                            </div>
                            <div className="note-appointment-wrapper">
                                <p>If it takes more time, extra charges will apply.</p>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="appointment-page-address-details">
                                <p>Address :</p>
                                <p>13101 SOUTHAMPTON ST DETROIT MI 48213-3700 USA</p>
                            </div>
                            <span className='change-address-app-page'>Change Address</span>
                        </div>
                        <div className="col-lg-7">
                            <div className="appointment-page-confirm-button">
                                <button onClick={handleOrderNowClick}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
                    <div className='modal-content-here'>
                        <div className="modal-content-popup-title">
                            <p>Are you sure you want to Confirm ?</p>
                        </div>
                        <div className="modal-content-buttons d-flex gap-20">
                            <div class="modal-content-button">
                                <button onClick={handleCloseModal}>No</button>
                            </div>
                            <div class="modal-content-button">
                                <button onClick={handleOrderNowClick2}>Yes</button>
                            </div>
                        </div>

                    </div>
                </Modal>

                {/* modal 2 */}
                <Modal isVisible={isModalVisible2} onClose={handleCloseModal2}>
                    <div className='modal-content-here'>
                        <div className="modal-success-image">
                            <img src={right} />
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
                                <Link to="/service" style={{ textDecoration: "none" }}> <button>Back To Home</button></Link>
                            </div>
                        </div>

                    </div>
                </Modal>

            </div>

            <Footer />
        </div>
    )
}

export default ConfirmAppointment
