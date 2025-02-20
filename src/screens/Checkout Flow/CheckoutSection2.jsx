import React from 'react'
import CheckoutRight from './checkoutRight'
import CheckoutLeft from './CheckoutLeft'
import s1 from '../../media/images/s3.png'
import baseline from '../../media/images/ic_baseline-discount.png'
import right from '../../media/images/rarrow.png'
import { Link } from 'react-router-dom'

function CheckoutSection2() {
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
                        <CheckoutLeft />
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
                                           <Link to="/addBillingDetails" style={{textDecoration: "none"}} ><button className="add-details-button">Add Details</button></Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* Payment Options Section */}
                            <div className="payment-options">
                                <label>
                                    <input type="radio" name="payment-method" /> Paypal
                                </label>
                                <label>
                                    <input type="radio" name="payment-method" /> Google pay
                                </label>
                                <label>
                                    <input type="radio" name="payment-method" /> Apple pay
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <CheckoutRight />
                        {/* Review Product & Shipping Section */}
                        <div className="review-shipping">
                            <h2>Review Product & Shipping</h2>
                            <div className="product-details">
                                <img
                                    src={s1}
                                    alt="Nike Dunk Low"
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h3>Nike Dunk Low</h3>
                                    <p className="product-price">
                                        <span className="discount-price">$38.99</span>{" "}
                                        <span className="original-price">$29.99</span>
                                    </p>
                                    <div className="billing-info-colors">
                                        <p>Colours:</p><span className="billing-info-color-value"></span>
                                        <p>Size:</p> <span className="billing-info-size-value">M</span>
                                    </div>
                                    <p>QTY: 01</p>
                                </div>
                            </div>
                            <div className="shipping-info">
                                <h5>Delivery:</h5>
                                <p>International Shipping from United Kingdom</p>
                                <h5>Imh5ort Tax:</h5>
                                <p>US $5.00</p>
                            </div>
                        </div>
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
