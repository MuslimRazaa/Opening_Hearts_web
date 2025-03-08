import React from 'react'
import play from '../../../../media/images/lets-icons_video-fill.png'
import { Link } from 'react-router-dom'

function NonproFirstSec() {
    return (
        <>
            <div className='non-pro-banner-sec'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="non-pro-head-text">
                                <h1>together<span style={{ color: "#ffff", }}>we can do so much.</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="non-pro-first-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="non-side-sec-tex">
                                <h1>
                                    Non-Profit
                                </h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                                </p>
                                <div className="btn-non-star">
                                   <Link to="/non-profit-form"> <button type='button' className="btn-non-pro">Join as Non-Profit</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="non-pro-img-sec">
                                <div className="jar-container">
                                    <div className="jar-segment jar-segment-1"></div>
                                    <div className="jar-segment jar-segment-2"></div>
                                    <div className="jar-segment jar-segment-3"></div>
                                    <div className="jar-segment jar-segment-4"></div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className="non-pro-bottom-border">

            </div>

        <div className="non-profit-3rd-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="non-profit-3rd-section-text">
                            <h1>
                            <span style={{color:'#000000',}}>Real Businesses,</span>  real results
                            </h1>
                        </div>

                        <div className="non-pro-video-sec">
                        <div className="play-nonpro">
                            <img src={play} />
                        </div>
                        <div className="non-pro-text">
                            <p>“Selling products on Opening Heart opened a new world and fulfilled my dreams”</p>
                        </div>
                        </div>
                       
                    </div>
                </div>
            </div>
          
        </div>


        </>
    )
}

export default NonproFirstSec
