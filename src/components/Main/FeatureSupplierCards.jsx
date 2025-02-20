import React, { useEffect, useState } from 'react'
import image from '../../media/images/🤖 AI Generated Avatars_ Amir Fakhri.png'
import arg from '../../media/images/Argentina (AR).png'
import mask from '../../media/images/Mask group.png'
import mask2 from '../../media/images/Rectangle 17922.png'
import stars from '../../media/images/stars.png'
import time from '../../media/images/subway_time-3.png'
import { Link } from 'react-router-dom'
import { fetchProductPageSuplier } from '../../utils/api'

function FeatureSupplierCards({allSuplier}) {
    return (
        <div className='container'>
           {allSuplier?.map((suplier, index) => (
            <div className="supplier-card-main">
                <div className="supplier-card-top-sec">
                    <div className="supplier-card-name-plate d-flex">
                        <div className="supplier-profile-image">
                            <img src={suplier?.profile_image} />
                        </div>
                        <div className="supplier-profile-name-city">
                            <h2>{suplier?.shop_name}</h2>
                            <h5> {suplier?.year} Years</h5>
                            {/* <img src={arg} className='supplier-flag-image' /> */}
                        </div>
                    </div>
                    <div className="supplier-card-buttons">
                        <div class="f-service-detail-page-top-button">
                            <button style={{fontSize: "12px"}}>Contact</button>
                        </div>
                        <div class="f-service-detail-page-top-button">
                           <Link to={`/SuplierStore?guid=${suplier?.guid}`} ><button style={{fontSize: "12px"}}>View Store</button></Link> 
                        </div> 
                    </div>
                </div>
                <div className="supplier-card-bottm-sec">
                    <div className="supplier-card-rating-main">
                        <div className="supplier-rating">
                            <h3>Rating and Review <img src={stars} /></h3>
                            <p>{suplier?.rating}/5  <span>({suplier?.rating_count} Reviews)</span></p>
                        </div>
                        {/* <div className="supplier-response">
                            <h3>Response Time <img src={time} /></h3>
                            <p>02/ Hours</p>
                        </div> */}
                        <div className="supplier-deals">
                            <h3>Deals In</h3>
                            <div className='d-flex justify-content-left align-items-center gap-20' style={{margin: "10px 0px 0px"}}>    
                            {suplier?.category?.slice(0 , 3).map((cat) =>(
                                <p>{cat?.name}</p>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="supplier-card-images">
                        <div className="row">
                       {/* {allSuplier?.products?.slice(0, 3).map((pr) =>(
                            <div className="col-lg-3">
                                <img src={pr?.media[0]?.original_url} />
                            </div>))} */}
                           
                            <div className="col-lg-6 d-flex justify-content-right align-items-center gap-20">
                            <img src={suplier?.products[0]?.media[0]?.original_url} />
                            <img src={suplier?.products[1]?.media[0]?.original_url} />
                            <img src={suplier?.products[2]?.media[0]?.original_url} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default FeatureSupplierCards
