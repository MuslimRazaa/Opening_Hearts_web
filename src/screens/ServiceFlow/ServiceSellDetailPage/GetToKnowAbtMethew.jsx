import React from 'react'
import methew from '../../../media/images/methewSmall.png'
import nig from '../../../media/images/nigeriaa.png'
import star from '../../../media/images/star.svg'
import { Link } from 'react-router-dom'

function GetToKnowAbtMethew({data}) {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-6">
                    <div className="service-profile-page-get-to-know">
                        <h2>Get to know About {data?.vendor_service?.store_name}</h2>
                    </div>
                </div>
                <div className="col-lg-6"></div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="service-seller-profile-main">
                        <div className="row">
                            <div className="col-lg-2">
                                <div className="methew-small-user">
                                <Link to="/vandor-profile" style={{textDecoration:"none" , color:"black"}} >     <img src={data?.vendor_service?.profile_image} /></Link> 
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <div className="service-seller-details">
                                    <div className="service-seller-name">
                                    <h4>{data?.vendor_service?.store_name}</h4>
                                        <img src={nig} />
                                    </div>
                                    <div className="service-seller-ratings">
                                        <img src={star} />
                                        <p>{data?.vendor_service?.rating} <span style={{fontSize:"12px" , color:"gray"}}>/5 ({data?.vendor_service?.rating_count}) | </span> {data?.vendor_service?.sold_count} <span style={{fontSize:"12px" , color:"gray"}}>Completed orders</span></p>
                                        </div>
                                    <button>Top Rated</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6"></div>
            </div>
            <div className="get-to-know-table">
                <div className="from">
                    <p className='table-tt'>Form</p>
                    <p className='table-td'>{data?.vendor_service?.country}</p>
                </div>
                <div className="from">
                <p className='table-tt'>Average Response Time</p>
                <p className='table-td'>01/{data?.delivery_time}</p>
                </div>
                <div className="from">
                <p className='table-tt'>Since</p>
                <p className='table-td'>{data?.vendor_service?.joined}</p>
                </div>
                <div className="from">
                <p className='table-tt'>Last Delivery </p>
                <p className='table-td'>{data?.vendor_service?.lastDeliveryDate}</p>
                </div>
                <div className="from">
                <p className='table-tt'>Language</p>
                <p className='table-td'>{data?.vendor_service?.language}</p>
                </div>
            </div>
        </div>
    )
}

export default GetToKnowAbtMethew
