import React from 'react'
import image from '../../../../media/images/🌎 Map Maker_ Washington, (Standard).png'
import master from '../../../../media/images/master.png';
import paynieer from '../../../../media/images/poynier.png';
import square from '../../../../media/images/square.png';
import paypal from '../../../../media/images/paypal.png';
import stripe from '../../../../media/images/stripe.png';
import methew from '../../../../media/images/customerIcon.png';
import chat from '../../../../media/images/customerChat.png';
import email from '../../../../media/images/ic_outline-email.png';
import location from '../../../../media/images/location.png';
import s3 from '../../../../media/images/s333.png'

function ProductTableDashboardDetails() {
    return (
        <div className='service-detail-wrapper-dashboard-side'>
            <div className="service-detail-service-dashboard-heading">
                <h2>Order Details</h2>
                <p>Order ID : #e1f5ev15vr4fw6e4f</p>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="service-package-image">
                        <img src={image} />
                    </div>
                </div>
                <div className="col-lg-6">
                   
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="order-tracking-item-image">
                                    <img src={s3} />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="order-tracking-item-details">
                                    <h2>Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394</h2>
                                    <h4>$38.00</h4>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="order-tracking-item-size-color-quantity d-flex">
                                            <div className="order-tracking-item-size d-flex">
                                                <p>Size</p>
                                                <span>9.5</span>
                                            </div>
                                            <div className="order-tracking-item-color d-flex">
                                                <p>Color</p>
                                                <div className='order-tracking-item-color-value'></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="order-tracking-item-color d-flex">
                                            <h4>Quantity</h4>
                                            <span>1</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="order-tracking-item-calculation">
                                    <p>Subtotal (1 item)</p>
                                    <p>Shipping</p>
                                    <p>Discount</p>
                                    <br></br>
                                    <h3>Order Total</h3>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="order-tracking-item-calculation-values">
                                    <p>$58.88</p>
                                    <p>$56.00</p>
                                    <p>-$5.00</p>
                                    <br></br>
                                    <h3>$ 98.00</h3>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <div class="payment-label" style={{ padding: "12px" }}>
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
                    </div>

                </div>
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <div className="service-package-delivery-address">
                            <div className="delivery-status-content">
                                <h3>Delivery Status</h3>
                                <p>Est Delivery: Tue, Dec 15 -Wed, Dec 16</p>
                            </div>
                            <div className="delivery-status-button">
                                <button>Pending</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-6">
                        <div className="customer-detail main">
                            <div className="customer-detail-heading">
                                <h3>Customer Detail</h3>
                            </div>
                            <div className="customer-detail-wrapper">
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={methew} />
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <h4>Zaire Herwitz</h4>
                                            <p>#w34008</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={email} />
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <p>adam@gmail.com </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={location} />
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <p>123 West 45th Street, New York, NY 10036</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={chat} />
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <p>Chat with Mathew</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="customer-detail main">
                            <div className="customer-detail-heading">
                                <h3>My Detail</h3>
                            </div>
                            <div className="customer-detail-wrapper">
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={methew} />
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <h4>Zaire Herwitz</h4>
                                            <p>#w34008</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={email} />
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <p>adam@gmail.com </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={location} />
                                        </div>
                                        
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <p>123 West 45th Street, New York, NY 10036</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-lg-2">
                                        <div className="customer-detail-icon">
                                            <img src={chat} />
                                        </div>
                                    </div>
                                    <div className="col-lg-10">
                                        <div className="customer-detail-content">
                                            <p>Chat with Mathew</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
}

            export default ProductTableDashboardDetails