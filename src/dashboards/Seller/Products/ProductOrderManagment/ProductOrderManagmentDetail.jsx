import React, { useEffect, useState } from 'react'
import BlankUser from '../../../../media/images/blankuser.jpg';
import chat from '../../../../media/images/customerChat.png';
import email from '../../../../media/images/ic_outline-email.png';
import location from '../../../../media/images/location.png';
import s3 from '../../../../media/images/s333.png'
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import apis from '../../../../service';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';

function ProductOrderManagmentDetail() {
    const [orderDetail, setOrderDetail] = useState("")
    const [activeIndex, setActiveIndex] = useState("")
    const [loader, setLoader] = useState(true)
    const [fullScreenLoader, setFullScreenLoader] = useState(false)
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');

    const getProductOrderById = async (id) => {
        try {
            const response = await apis.getProductOrderById(id);
            setOrderDetail(response?.data?.data);
            setActiveIndex("")
            setLoader(false)
        } catch (error) {
            setLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }

    useEffect(() => {
        getProductOrderById(id)
    }, [])

    const updateProductOrderStatusById = async (body) => {
        setFullScreenLoader(true)
        try {
            const response = await apis.updateProductOrderStatusById(id, body);
            getProductOrderById(id);
            setFullScreenLoader(false)
        } catch (error) {
            setFullScreenLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }
    const updateProductRefundStatusById = async (body) => {
        setFullScreenLoader(true)
        try {
            const response = await apis.updateProductRefundStatusById(body);
            getProductOrderById(id);
            setFullScreenLoader(false)
        } catch (error) {
            setFullScreenLoader(false)
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
            });
        }
    }
    return (
        <>
            {fullScreenLoader &&
                <div className="full-screen-loader">
                    <LoadingComponents />
                </div>
            }
            {loader ?
                <LoadingComponents />
                :
                <div className='service-detail-wrapper-dashboard-side'>
                    <div className="service-detail-service-dashboard-heading">
                        <h2>Order Details</h2>
                        <p>Order ID : #{orderDetail?.order?.orderid}</p>
                    </div>
                    {orderDetail?.seller_data?.map((shop, j) => {
                        return (
                            <div className="product-d-p-l" key={j}>
                                <div className="row">
                                    {/* <div className="col-lg-12">Shop : {shop?.shop_name}</div> */}
                                    <div className="col-lg-12">
                                        {shop?.products?.map((product, index) => {
                                            return (
                                                <div>
                                                    <div className="row mt-2 mb-2">
                                                        <div className="col-lg-3">
                                                            <div className="order-tracking-item-image">
                                                                <img src={product?.product?.media?.[0]?.original_url} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-9">
                                                            <div className="order-tracking-item-details">
                                                                <h2>{product?.product?.title}</h2>
                                                                <h4>${+product?.product?.discount_price > 0 ? product?.product?.discount_price : product?.product?.price}</h4>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-9">
                                                                    <div className="order-tracking-item-size-color-quantity d-flex">
                                                                        {product?.order_attribute?.map((attribute, k) => {
                                                                            return (
                                                                                <div className="order-tracking-item-size d-flex" key={k}>
                                                                                    <p>{attribute?.name}</p>: <span>{attribute?.attribute?.name}</span>
                                                                                    {product?.order_attribute?.length - 1 === k ? "" : <br />}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>

                                                                </div>
                                                                <div className="col-lg-3">
                                                                    <div className="order-tracking-item-color d-flex">
                                                                        <h4>Quantity</h4>
                                                                        <span>{product?.quantity}</span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            {product?.status === 'pending' ?
                                                                <div className="order-action-section">
                                                                    <div className="delivery-status-button">
                                                                        <button onClick={() => { setActiveIndex(activeIndex === index ? "" : index) }}>{product?.status}</button>
                                                                        {activeIndex === index ?
                                                                            <ul>
                                                                                <li onClick={() => { updateProductOrderStatusById({ status: 1, order_id: product?.id }) }}>Accept</li>
                                                                                <li onClick={() => { updateProductOrderStatusById({ status: 2, order_id: product?.id }) }}>Reject</li>
                                                                            </ul>
                                                                            :
                                                                            null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                            {product?.status === 'accepted' ?
                                                                <div className="order-action-section">
                                                                    <div className="delivery-status-button">
                                                                        <button onClick={() => { setActiveIndex(activeIndex === index ? "" : index) }}>{product?.status}</button>
                                                                        {activeIndex === index ?
                                                                            <ul>
                                                                                <li onClick={() => { updateProductOrderStatusById({ status: 3, order_id: product?.id }) }}>Completed</li>
                                                                            </ul>
                                                                            :
                                                                            null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                            {product?.status === 'completed' ?
                                                                <div className="order-action-section">
                                                                    <div className="delivery-status-button">
                                                                        <button onClick={() => { setActiveIndex(activeIndex === index ? "" : index) }}>{product?.status}</button>
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                            {product?.status === 'cancel' ?
                                                                <div className="order-action-section">
                                                                    <div className="delivery-status-button">
                                                                        <button onClick={() => { setActiveIndex(activeIndex === index ? "" : index) }}>{product?.status}</button>
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                            {product?.status === 'refunded' ?
                                                                <div className="order-action-section">
                                                                    <div className="delivery-status-button">
                                                                        <button onClick={() => { setActiveIndex(activeIndex === index ? "" : index) }}>{product?.status}</button>
                                                                        {activeIndex === index ?
                                                                            <ul>
                                                                                <li onClick={() => { updateProductRefundStatusById({ status: "approved", id: product?.refund?.id }) }}>Approved</li>
                                                                                <li onClick={() => { updateProductRefundStatusById({ status: "rejected", id: product?.refund?.id }) }}>Rejected</li>
                                                                            </ul>
                                                                            :
                                                                            null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                            }
                                                        </div>
                                                    </div>
                                                    {product?.status === 'refunded' ?
                                                    <>
                                                        <div className="row mt-4">
                                                            <div className="col-lg-12">
                                                                <div className="customer-detail main">
                                                                    <div className="customer-detail-heading">
                                                                        <h3>Refund Reason</h3>
                                                                        <p>{product?.refund?.reason}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-4">
                                                            <div className="col-lg-12">
                                                                <div className="customer-detail main">
                                                                    <div className="customer-detail-heading">
                                                                        <h3>Refund Images</h3>
                                                                        <div className="row">
                                                                            {product?.refund?.media?.map((img , z) =>{
                                                                                return(
                                                                            <div className="col-lg-2" key={z}>
                                                                                <img src={img?.original_url} alt="" className='producy-refund-images'/>
                                                                            </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                        :
                                                        null}
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="order-tracking-item-calculation">
                                <p>Subtotal ({orderDetail?.seller_data?.[0]?.products?.length} item)</p>
                                <p>Shipping</p>
                                <p>Discount</p>
                                <br></br>
                                <h3>Order Total</h3>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="order-tracking-item-calculation-values">
                                <p>${orderDetail?.order?.subtotal_price}</p>
                                <p>${orderDetail?.order?.shipping_cost}</p>
                                <p>-${orderDetail?.order?.discount}</p>
                                <br></br>
                                <h3>${orderDetail?.order?.total_price}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <div className="customer-detail main">
                                <div className="customer-detail-heading">
                                    <h3>Customer Detail</h3>
                                </div>
                                <div className="customer-detail-wrapper">
                                    <div className="row mt-2">
                                        <div className="col-lg-1">
                                            <div className="customer-detail-icon">
                                                <img src={orderDetail?.order?.user?.profile_image ? orderDetail?.order?.user?.profile_image : BlankUser} />
                                            </div>
                                        </div>
                                        <div className="col-lg-11">
                                            <div className="customer-detail-content">
                                                <h4>{orderDetail?.order?.user?.first_name} {orderDetail?.order?.user?.last_name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-lg-1">
                                            <div className="customer-detail-icon">
                                                <img src={email} />
                                            </div>
                                        </div>
                                        <div className="col-lg-11">
                                            <div className="customer-detail-content">
                                                <p>{orderDetail?.order?.user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-lg-1">
                                            <div className="customer-detail-icon">
                                                <img src={location} />
                                            </div>
                                        </div>
                                        <div className="col-lg-11">
                                            <div className="customer-detail-content">
                                                <p>{orderDetail?.order?.user?.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-lg-1">
                                            <div className="customer-detail-icon">
                                                <img src={chat} />
                                            </div>
                                        </div>
                                        <div className="col-lg-11">
                                            <div className="customer-detail-content">
                                                <p>Chat with {orderDetail?.order?.user?.first_name} {orderDetail?.order?.user?.last_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-6">
                    <div className="customer-detail main">
                        <div className="customer-detail-heading">
                            <h3>My Detail</h3>
                        </div>
                        <div className="customer-detail-wrapper">
                            <div className="row mt-2">
                                <div className="col-lg-2">
                                    <div className="customer-detail-icon">
                                        <img src={methew} />
                                    </div>
                                </div>
                                <div className="col-lg-10">
                                    <div className="customer-detail-content">
                                        <h4>Zaire Herwitz</h4>
                                        <p>#w34008</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-2">
                                    <div className="customer-detail-icon">
                                        <img src={email} />
                                    </div>
                                </div>
                                <div className="col-lg-10">
                                    <div className="customer-detail-content">
                                        <p>adam@gmail.com </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-2">
                                    <div className="customer-detail-icon">
                                        <img src={location} />
                                    </div>

                                </div>
                                <div className="col-lg-10">
                                    <div className="customer-detail-content">
                                        <p>123 West 45th Street, New York, NY 10036</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-2">
                                    <div className="customer-detail-icon">
                                        <img src={chat} />
                                    </div>
                                </div>
                                <div className="col-lg-10">
                                    <div className="customer-detail-content">
                                        <p>Chat with Mathew</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                    </div>
                </div>

            }
        </>
    )
}

export default ProductOrderManagmentDetail