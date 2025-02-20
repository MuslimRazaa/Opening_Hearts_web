import React from "react";
import i from '../../media/images/i.png'

const CheckoutLeft = ({cartItems}) => {
  return (
    <div className="payment-container">
      {/* Shipping Details */}
      <div className="shipping-details">
        <h2>Shipping Details</h2>
        <div className="full-name-checkout">
            <p> Full Name </p>
            <h5 className="checkout-fullname"> {cartItems[0]?.user?.name} </h5>
        </div>
        <div className="phone-checkout">
            <p> Phone </p>
            <h5 className="checkout-phone"> {cartItems[0]?.user?.phone_number || "XXXXXXXXXX"} </h5>
        </div>
        <div className="Address-checkout">
            <p> Address </p>
            <h5 className="checkout-Address"> {cartItems[0]?.user?.address} </h5>
        </div>
        <p className="checkout-change-address">Change Address</p>
      </div>

      {/* Payment Form */}
      <div className="payment-form">
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
        </form>
        <div className="add-billing-address">
            <h3>Billing Address</h3>
            <div className="d-flex align-items-center gap-20">
            <p>Jane Smith, 987 Maple Avenue, Springfield, IL 62704, USA</p> <span className="edit-billing-address">Edit</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLeft;
