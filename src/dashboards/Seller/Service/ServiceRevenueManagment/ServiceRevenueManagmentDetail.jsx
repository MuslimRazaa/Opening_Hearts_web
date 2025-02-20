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

function ServiceRevenueManagmentDetail() {
    const [orderDetail, setOrderDetail] = useState("")
    const [activeIndex, setActiveIndex] = useState("")
    const [loader, setLoader] = useState(true)
    const [fullScreenLoader, setFullScreenLoader] = useState(false)
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const id = params.get('id');

    const getServiceOrderDetail = async (id) => {
        try {
            const response = await apis.getServiceOrderDetail(id);
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
        getServiceOrderDetail(id)
    }, [])

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
                    {orderDetail?.provider_data?.map((shop, j) => {
                        return (
                            <div className="product-d-p-l" key={j}>
                                <div className="row">
                                    {/* <div className="col-lg-12">Shop : {shop?.shop_name}</div> */}
                                    <div className="col-lg-12">
                                        {shop?.service?.map((product, index) => {
                                            return (
                                                <div>
                                                    <div className="row mt-2 mb-2">
                                                        <div className="col-lg-3">
                                                            <div className="order-tracking-item-image">
                                                                <img src={product?.service_product?.cover_image} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-9">
                                                            <div className="order-tracking-item-details">
                                                                <h2>Name: {product?.service_product?.name}</h2>
                                                                <h2 style={{ paddingBottom: '0px', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '20px' }}>Type: {product?.service_plan_id ? "Package" : 'Fixed'}</h2>
                                                                {product?.service_plan_id ?
                                                                    <h2 style={{ paddingBottom: '0px', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '20px' }}>Package Type: {product?.serviceplan?.plan_type}</h2>
                                                                    :
                                                                    null
                                                                }
                                                                <h2 style={{ paddingBottom: '0px', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '20px' }}>Price: {product?.service_plan_id ? product?.serviceplan?.plan_price : product?.service_product?.set_price}</h2>
                                                                <h2 style={{ paddingBottom: '0px', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '20px' }}>Day: {product?.service_plan_id ? product?.serviceplan?.delivery_time : product?.service_product?.delivery_time}</h2>
                                                                {/* <h4>${+product?.product?.discount_price > 0 ? product?.product?.discount_price : product?.product?.price}</h4> */}
                                                            </div>

                                                            <div className="order-action-section">
                                                                <div className="delivery-status-button">
                                                                    <button>Completed</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                <p>Discount</p>
                                <br></br>
                                <h3>Order Total</h3>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="order-tracking-item-calculation-values">
                                <p>${orderDetail?.order?.subtotal_price}</p>
                                <p>${orderDetail?.discount}</p>
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

export default ServiceRevenueManagmentDetail