import React from 'react'
import cart from '../../media/images/carttt.svg'
import { Link } from 'react-router-dom'

function ProductCard({guid, image, name, price, discounted_price}) {
  return (
    <div className='product-card'>
        <Link to={`/productDetail?guid=${guid}`} > <div className='product-card-wrapper'>
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
                            <img src={cart} />
                        </div>
                </div>
                
            </div>
        </div></Link>
    </div>
  )
}

export default ProductCard
