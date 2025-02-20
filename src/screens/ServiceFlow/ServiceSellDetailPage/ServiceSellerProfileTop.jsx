import React from 'react'
import methew from '../../../media/images/methewSmall.png'
import nig from '../../../media/images/nigeriaa.png'
import star from '../../../media/images/star.svg'
import { Link } from 'react-router-dom'

function ServiceSellerProfileTop({data, available}) {

    return (
        <div className='container'>
            <div className="service-profile-wrapper">
                
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
                               <Link to="/vandor-profile" style={{textDecoration:"none" , color:"black"}} >  <div className="service-seller-name">
                                    <h4>{data?.vendor_service?.store_name}</h4>
                                        <img src={nig} />
                                    </div></Link> 
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
            <div className="col-lg-6">
               {available && <div className="service-seller-availability">
                    <button>Available Right Now</button>
                </div>}
            </div>
            </div>

            </div>
        </div>
    )
}

export default ServiceSellerProfileTop
