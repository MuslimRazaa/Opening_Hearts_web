import React from 'react'
import stripe from '../../media/images/stripe.png'
import square from '../../media/images/square.png'
import master from '../../media/images/master.png'
import paynieer from '../../media/images/poynier.png'
import paypal from '../../media/images/paypal.png'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'


function ShoppingCartRight({loading, cartItemPrices}) {

    return (
        <div className='shopping-cart-details'>
            <div className='shopping-cart-details-title'>
                <h2>Price</h2>
                {/* <h4>${subtotalupdated}</h4> */}
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="shopping-cart-details-table-keys">
                        <ul>
                            <li style={{color:"black"}}>Subtotal</li>
                            <li>Discount</li>
                            <li>Import Tax</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="shopping-cart-details-table-values">
                        <ul>
                            <li style={{color:"black"}}>{loading ? <Spinner animation="border" role="status"/> : "$"+cartItemPrices?.subtotal}</li>
                            <li>{cartItemPrices?.discount}</li>
                            <li>${cartItemPrices?.tax}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="shopping-cart-details-shipping">
                <h2>Shipping:</h2>
                <p>US $0.00 Expedited International Shipping. See details for shipping
                International shipment of items may be subject to customs processing and additional charges</p>
            </div>
                <div className="shopping-cart-details-sub-total">
                <div className="row">
                    <div className="col-lg-6">
                        <h2>Sub Total</h2>
                    </div>
                    <div className="col-lg-6">
                        <h3>{loading ? <Spinner animation="border" role="status"/> : "$"+cartItemPrices?.subtotal}</h3>
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
               <Link to='/checkOut' style={{textDecoration:"none"}}> <button  style={{width:"100%"}}>Proceed to Checkout</button></Link>
             </div>
        </div>
    )
}

export default ShoppingCartRight
