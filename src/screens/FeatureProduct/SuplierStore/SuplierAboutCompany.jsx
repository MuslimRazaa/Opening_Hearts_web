import React from 'react'
import SuplierSilder from './SuplierSilder'
import stars from '../../../media/images/stars.png'
function SuplierAboutCompany({ vendor, guid }) {
    return (
        <div className='container'>
            {/* <div className="row">
        <div className="col-lg-12">
            <div className="suplier-about-company-title">

            </div>
        </div>
      </div> */}
            <div className='fund-about-organize' style={{ marginBottom: "30px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="suplier-about-company-title">
                                <h2>About Company</h2>
                            </div>
                            <div className="row">
                                <div className="funding-slider">
                                    <div className="col-md-12">
                                        <SuplierSilder guid={guid} />
                                    </div>
                                </div>
                            </div>
                            <div className="suplier-store-text-about">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        <div className="store-text-about">
                                            <p>
                                                {vendor?.shop_description ? vendor?.shop_description : " Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March ExpoBoost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo."}


                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="store-text-about-ratings">
                                            <h3>{vendor?.rating}<span style={{ color: "gray", fontSize: "13px" }}>/5   {
                                                Math.floor(vendor?.rating) > 0 && Math.floor(vendor?.rating) <= 2
                                                    ? "Not satisfied"
                                                    : Math.floor(vendor?.rating) > 2 && Math.floor(vendor?.rating) < 4
                                                        ? "Satisfied"
                                                        : Math.floor(vendor?.rating) >= 4
                                                            ? "Very Satisfied"
                                                            : ""} </span></h3>
                                            <img src={stars} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        {/* <div className="both-camp-txt-suplier">
                                            <h2>
                                                78+
                                            </h2>
                                            <p>Company</p>
                                        </div> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='3rd-sec-fund-dona mb-5'>
                <div className="row">
                    <div className="third-section-card">
                        <div className="col-md-2">
                            <div className="locations-sec">
                                <h2>Business type</h2>
                                <p>
                                    Manufacturer
                                </p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="website-sec">
                                <h2>Main Products </h2>
                                <p>
                                    Headphones,<br></br>
                                    Microphone, Airpods,<br></br>
                                    Chargers
                                </p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="established-sec">
                                <h2>Country</h2>
                                <p>
                                    UAE
                                </p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="established-sec">
                                <h2>Total Revenue</h2>
                                <p>
                                    $2.5Millions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuplierAboutCompany
