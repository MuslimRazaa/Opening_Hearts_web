import React, { useState } from 'react'
import s3 from '../../media/images/s3.png'
import Counter from './Counter'
import { checkOutCart, removeCart } from '../../utils/api';
import CartItemCounter from './Counter';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
function ShoppingCartCard({ fetchCheckOutBothPrice, item, image, name, description, Category, price, discounted_price, guid, onRemoveStatusChange, fetchCartItems }) {
    const [remove, setRemove] = useState(true)

    const removeCartItem = async () => {
        try {
            const response = await removeCart(guid);
            fetchCartItems();
            fetchCheckOutBothPrice();

            toast.success('Item Removed Successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };


    // const refreshCart = () => {
    //     onRemoveStatusChange(remove);
    // };


    return (
        <div className='shopping-cart-card-main'>
            <ToastContainer />

            <div className="row">
                <div className="col-lg-3">
                    <div className="shopping-cart-card-image">
                        <img src={image} />
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="shpping-card-right">
                        <div className="shopping-cart-card-top">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="shopping-cart-card-top-text">
                                        <h3>{name}</h3>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="shopping-cart-card-top-button">
                                        <button onClick={() => removeCartItem(guid)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shopping-cart-card-price">
                            <span style={{ color: "hsla(0, 0%, 13%, 1)", fontSize: "29px", fontFamily: "openSansB" }}>Price:</span><h2>$ {discounted_price > 0 ? discounted_price : price} </h2>
                            <h4>+US ${price}</h4>
                        </div>

                        <div className="shopping-cart-card-description">
                            <p>{description}</p>
                        </div>
                        <hr></hr>
                        {/* <div className="shopping-cart-card-properties">
                            <div className='d-flex justify-conternt-center align-items-center gap-20'>
                                <div className='color'>Colours:</div>
                                <div>⚫</div>
                            </div>
                            <div className='d-flex justify-conternt-center align-items-center gap-20'>
                                <div className='size'>Size:</div>
                                <div className='size-shp-cart'>M</div>
                            </div>
                        </div> */}
                        <div className="shopping-cart-card-quantity">
                            <div className='shopping-cart-quantity-description'>
                                <p>International Shipping from United Kingdom</p>
                            </div>

                            <div className='shopping-cart-counter'>
                                <p>Quantity :</p> <CartItemCounter fetchCheckOutBothPrice={fetchCheckOutBothPrice} item={item} itemId={guid} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartCard
