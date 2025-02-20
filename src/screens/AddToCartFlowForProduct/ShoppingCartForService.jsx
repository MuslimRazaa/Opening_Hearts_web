import React, { useState } from 'react'
import { removeServiceCart } from '../../utils/api';

import { toast, ToastContainer } from 'react-toastify';
function ShoppingCartForService({ item, fetchServiceCartItems, revision, delivery_time, image, name, description, Category, price, type, guid, onRemoveStatusChange }) {
    const [remove, setRemove] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 130;  // Adjust this value as needed

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    const removeCartItem = async () => {
        const id = item?.id;
        try {
            await removeServiceCart(id);
            toast.success("Item Removed Successfully!");
            fetchServiceCartItems();
        } catch (error) {
            toast.error(error.message);
        }
    };

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
                            <span style={{ color: "hsla(0, 0%, 13%, 1)", fontSize: "29px", fontFamily: "openSansB" }}>Price:</span><h2>$ {price} </h2>
                            <h4>Type: {type}</h4>
                        </div>

                        <div className="shopping-cart-card-description">
                            <p>
                                {isExpanded ? description : `${description?.slice(0, maxLength)}......`}
                                <button onClick={toggleReadMore} style={{ background: 'none', border: 'none', color: '#ff6464', cursor: 'pointer', fontFamily: 'Poppins' }}>
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            </p>                        </div>
                        <hr></hr>
                        <div className="shopping-cart-card-quantity">
                            <div className='shopping-cart-quantity-description'>
                                <p>{revision}</p>
                            </div>

                            <div className='shopping-cart-counter'>
                                <p>Delivery Time: {delivery_time}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartForService
