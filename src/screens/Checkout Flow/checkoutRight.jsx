import React, { useState } from 'react'
import stripe from '../../media/images/stripe.png'
import square from '../../media/images/square.png'
import right from '../../media/images/tic.png'
import master from '../../media/images/master.png'
import paynieer from '../../media/images/poynier.png'
import paypal from '../../media/images/paypal.png'
import Modal from '../../components/Layout/Modal'
import { Link } from 'react-router-dom'

function CheckoutRight() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOrderNowClick = () => {
      setIsModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setIsModalVisible(false);
    };
  
  return (
    <div className='shopping-cart-details'>
    <div className='shopping-cart-details-title'>
        <h2>Price Before Shipping</h2>
        <h4>$38.99</h4>
    </div>
    <div className="row">
        <div className="col-lg-6">
            <div className="shopping-cart-details-table-keys">
                <ul>
                    <li style={{color:"black"}}>Subtotal ( 2 items )</li>
                    <li>Shipping</li>
                    <li>Discount</li>
                    <li>Import Tax</li>
                </ul>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="shopping-cart-details-table-values">
                <ul>
                    <li style={{color:"black"}}>$38.99</li>
                    <li>$29.99 </li>
                    <li>-$5.00</li>
                    <li>$5.00</li>
                </ul>
            </div>
        </div>
    </div>
    <div className="shopping-cart-details-shipping">
        <h2>Shipping:</h2>
        <p>US $22.00 Expedited International Shipping. See details for shipping
        International shipment of items may be subject to customs processing and additional charges</p>
    </div>
        <div className="shopping-cart-details-sub-total">
        <div className="row">
            <div className="col-lg-6">
                <h2>Sub Total</h2>
            </div>
            <div className="col-lg-6">
                <h3>$ 68.98</h3>
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
        <button onClick={handleOrderNowClick} >Order Now</button>
     </div>
     <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
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
          <Link to="/orderTracking" style={{textDecoration:"none"}}><button>Order Track</button></Link>
        </div>
        <div class="modal-content-button">
        <Link to="/featureProduct" style={{textDecoration:"none"}}> <button>Back To Home</button></Link> 
        </div>
            </div>

        </div>
      </Modal>
</div>
  )
}

export default CheckoutRight