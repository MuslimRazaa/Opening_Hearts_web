
import React from 'react'
import cart from '../../../../media/images/carttt.svg'
import { Link } from 'react-router-dom'

function OtherRelatedServicecard({image}) {
  return (
    <div className='product-card'>
        <div className='product-card-wrapper'>
            <div className='product-card-image'>
                <img src={image} />
            </div>
            <div className='feature-product-card-content'>
                <div className='prodduct-card-content-main'>
                    <div className="feature-product-card-add-to-cart">
                    <div className='product-card-price'>
                        <div className='product-card-actual-price' >
                            <h4>RedBook</h4>
                        </div>
                    </div>
                    <div className='feature-prodduct-card-icon'>
                        <div className='feature-product-card-icon-wrapper'>
                            <img src={cart} />
                            <Link to="/productDetail" style={{textDecoration: "none"}}><p>Add to Cart</p></Link>
                        </div>
                </div>
                    </div>
                    
                </div>
               
                
            </div>
        </div>
    </div>
  )
}

export default OtherRelatedServicecard
