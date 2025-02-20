import React from 'react'
import image from '../../../media/images/🤖 AI Generated Avatars_ Amir Fakhri.png'
import arg from '../../../media/images/Argentina (AR).png'
import stars from '../../../media/images/stars.png'
import time from '../../../media/images/subway_time-3.png'
import heart from '../../../media/images/heartsss.png'
import share from '../../../media/images/material-symbols_share-outline.png'

function KeepYourSupplier() {
    return (
        <div className='container'>
            <div className="keep_your-supplier-detail-page-main">
                <div className='keep_your-supplier-detail-page'>
                    <h2>Know your supplier</h2>
                </div>
                <div className="keep-your-supplier-section">
                    <div className="row">
                        <div className="col-lg-1">
                            <div className="supplier-profile-image">
                                <img src={image} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="Keep-your-supplier-profile-name-city">
                                <h2>Zhejiang Yonjou Technology Ltd.</h2>
                                <h5>07 Years</h5>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="supplier-card-buttons">
                                <div class="f-service-detail-page-top-button">
                                    <button style={{ fontSize: "12px" }}>Contact</button>
                                </div>
                                <div class="f-service-detail-page-top-button">
                                    <button style={{ fontSize: "12px" }}>View Store</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-1">
                         
                        </div>
                        <div className="col-lg-11">
                            <div className="keep-supplier-ratings">
                                <div className="keep_your-supplier-rating">
                                    <h3>Rating and Review <img src={stars} /></h3>
                                    <p>4.8/5  <span>(215 Reviews)</span></p>
                                </div>
                                <div className="keep_your-supplier-response">
                                    <h3>Response Time <img src={time} /></h3>
                                    <p>02/ Hours</p>
                                </div>
                                <div className="keep_your-supplier-deals">
                                    <h3>Main Products</h3>
                                    <p>Headphones, Microphone, Airpods, Chargers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-11"></div>
                        <div className="col-lg-1">
                            <div className="keep-your-sup-icons">
                                <img src={heart} />
                                <img src={share} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default KeepYourSupplier
