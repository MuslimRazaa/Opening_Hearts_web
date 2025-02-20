import React, { useContext } from 'react'
import cart from '../../media/images/carttt.svg'
import { Link } from 'react-router-dom'
import { fetchCartCountAPI } from '../../utils/api';
import { AppContext } from '../../utils/ContextApi/AppContext';

function FeatureProductCard({ image, name, Category, price, discounted_price, guid }) {

    const handleAddToCart = () => {
        window.scrollTo({
            top: 0, // Scroll to top of the page
            behavior: 'smooth', // Smooth scroll animation
        });
    }

    return (
        <div className='product-card-inner-page '>
            <div className='product-card-wrapper'>
                <Link to={`/productDetail?guid=${guid}`} style={{ textDecoration: "none" }}> <div className='product-card-image-inner-page'>
                    <img src={image} />
                </div></Link>
                <div className='feature-product-card-content'>
                    <div className='prodduct-card-content-main'>
                        <div className='product-card-title'>
                            <h4>{name}</h4>
                        </div>
                        <div className='product-card-catagory'>
                            <h4>Category: {Category}</h4>
                        </div>
                        <div className="feature-product-card-add-to-cart">
                            <div className='product-card-price'>
                                <div className='product-card-actual-price' >
                                    <h4>${Math.floor(discounted_price)}</h4>
                                </div>
                                <div className='product-card-cut-price' >
                                    <h4>${Math.floor(price)}</h4>
                                </div>
                            </div>
                            <div className='feature-prodduct-card-icon'>
                                <div className='feature-product-card-icon-wrapper'>
                                    <img src={cart} />
                                    <Link to={`/productDetail?guid=${guid}`} style={{ textDecoration: "none" }}>   <p onClick={handleAddToCart}>Add to Cart</p></Link>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default FeatureProductCard
