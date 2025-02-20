import React from 'react'
import cart from '../../media/images/carttt.svg'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import apis from '../../service';

function SellerProductCard({ setFullLoading, product, getSellerProducts, guid , page_size }) {
    const navigate = useNavigate();

    const updateProductStatus = async (id, status) => {
        setFullLoading(true)
        try {
            const response = await apis.updateProductStatus({ id: id, status: status });
            getSellerProducts(guid , 1 , page_size)
        } catch (error) {
            setFullLoading(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message
            });
        }
    };
    return (
        <div className='seller-product-card'>
            <div className='seller-product-card-wrapper'>
                <div className='seller-product-card-image'>
                    <img src={product?.media?.[0]?.original_url} />
                    <div
                        className={product.status === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                        onClick={() => { updateProductStatus(product.id, product?.status === 0 ? 1 : 0) }}>
                        <div className={`toggle-price-switch ${product.status === 1 ? "on" : "off"}`}></div>
                    </div>
                </div>
                <div className='seller-product-card-content'>
                    <div className='seller-prodduct-card-content-main'>
                        <div className='seller-product-card-title'>
                            <h4>{product?.title}</h4>
                        </div>
                        <div className='seller-product-card-catagory'>
                            <h4>Category: {product?.category?.name}</h4>
                        </div>
                        <div className='seller-product-card-price'>
                            {product?.discount_price === "0.00" ?
                                <>
                                    <div className='seller-product-card-actual-price' >
                                        <h4>${product?.price}</h4>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='seller-product-card-actual-price' >
                                        <h4>${product?.discount_price}</h4>
                                    </div>
                                    <div className='seller-product-card-cut-price' >
                                        <h4>$${product?.price}</h4>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className='seller-prodduct-card-icon'>
                        <div className='product-card-icon-wrapper'>
                            <p onClick={() => { navigate(`/dashboard/update-product?id=${product.id}`) }} style={{ cursor: 'pointer' }}>Edit</p>
                        </div>
                    </div>
                </div>
                {/* <div
                    className={productDetails.deliver_domestic === 1 ? "toggle-price-toggle-switch" : "toggle-price-toggle-switch-off"}
                    onClick={() => { setProductDetails((prev) => ({ ...prev, deliver_domestic: productDetails.deliver_domestic === 1 ? 0 : 1 })) }}>
                    <div className={`toggle-price-switch ${productDetails.deliver_domestic === 1 ? "on" : "off"}`}></div>
                  </div> */}
            </div>
        </div>
    )
}

export default SellerProductCard
