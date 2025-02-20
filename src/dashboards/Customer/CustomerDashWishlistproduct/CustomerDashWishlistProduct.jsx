
import React, { useEffect, useState } from 'react'
import cart from '../../../media/images/carttt.svg';
import { Link } from 'react-router-dom';
import { getWishlistProduct } from '../../../utils/api';
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents';


function CustomerDashWishlistProduct() {
    const [active, setActive] = useState("ecommerce")   // hook useState
    const [loading, setLoading] = useState(false)   // hook useState
    const [products, setProducts] = useState([])   // Saved Product useState


    const fetchSavedProducts = async () => {
        setLoading(true)
        try {
            const response = await getWishlistProduct();
            setProducts(response?.data?.data?.favourites)
            setLoading(false)
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchSavedProducts()
    }, [])


    const handleTabClick = (tab) => {
        setActive(tab)
    }

    return (
        <div>
            <div className="customer-dash-buttons-tabs-class">
                <button className={active === "ecommerce" ? 'btn-tab-setting-active' : 'btn-tab-setting'} type='button' onClick={() => handleTabClick("ecommerce")} >Wishlist Products</button>
            </div>
            <div className="save-product-class-active">
                <div className="heading-side-customer-pro-dash">
                <div>

                    <h2>Wish List (Products)</h2>
                    <p>{products?.length} Saved Products</p>
                </div>
                </div>

                {loading ? <LoadingComponents />  :
                    (<div className="row mt-5">
                        {products?.map((item) => (
                            <div className="col-md-4">
                                <div className='product-card'>
                                    <Link to={`/productDetail?guid=${item?.product?.guid}`}><div className='product-card-wrapper'>
                                        <div className='product-card-image'>
                                            <img src={item?.product?.media[0]?.original_url} />
                                        </div>
                                        <div className='feature-product-card-content'>
                                            <div className='prodduct-card-content-main'>
                                                <div className='product-card-title'>
                                                    <h4>{item?.product?.title}</h4>
                                                </div>
                                                <div className='product-card-catagory'>
                                                    <h4>Category: {item?.product?.category?.name}</h4>
                                                </div>
                                                <div className="feature-product-card-add-to-cart">
                                                    <div className='product-card-price'>
                                                        <div className='product-card-actual-price' >
                                                            <h4>${Math.floor(item?.product?.discount_price)}</h4>
                                                        </div>
                                                        <div className='product-card-cut-price' >
                                                            <h4>${Math.floor(item?.product?.price)}</h4>
                                                        </div>
                                                    </div>
                                                    <div className='feature-prodduct-card-icon'>
                                                        <div className='feature-product-card-icon-wrapper'>
                                                            <img src={cart} />
                                                            <p>Add to Cart</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    </div></Link>
                                </div>
                            </div>))}
                    </div>)}
            </div>
        </div>
    )
}

export default CustomerDashWishlistProduct
