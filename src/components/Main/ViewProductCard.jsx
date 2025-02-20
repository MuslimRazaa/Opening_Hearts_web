import React from 'react'
import cart from '../../media/images/carttt.svg'

function ViewProductCard({image, name, price, discounted_price}) {
  return (
    <div className='product-card'>
        <div className='product-card-wrapper'>
            <div className='product-card-image'>
                <img src={image} />
            </div>
            <div className='product-card-content'>
                <div className='prodduct-card-content-main'>
                    <div className='product-card-title'>
                        <h4>{name}</h4>
                    </div>
                    <div className='product-card-catagory'>
                        <h4>Category: Mens Shoes</h4>
                    </div>
                    <div className='product-card-price'>
                        <div className='product-card-actual-price' >
                            <h4>${discounted_price}</h4>
                        </div>
                        <div className='product-card-cut-price' >
                            <h4>${price}</h4>
                        </div>
                    </div>
                </div>
                <div className='prodduct-card-icon'>
                        <div className='product-card-icon-wrapper'>
                            <p>Edit</p>
                        </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ViewProductCard
