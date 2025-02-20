import React from 'react'
import image1 from '../../media/images/Rectangle 30003.png'
import image2 from '../../media/images/Rectangle 30001.png'
import image3 from '../../media/images/Rectangle 17807.png'
import image4 from '../../media/images/Rectangle 17811.png'
import media from '../../media/images/Rectangle 17808.png'
import play from '../../media/images/lets-icons_video-fill.png'

function DonationHomeSection3() {
    return (
        <>
            <div className='container'>
                <div className="reach-new-markets-main">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="reach-new-markets-title">
                                <div className="reach-new-markets-title-content">
                                    <h2>Reach New Markets</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley </p>
                                </div>
                                <div className="reach-new-markets-title-two">
                                    <h2>10M+</h2>
                                    <h3>Active Buyers</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="reach-new-markets-image-collage-main">
                                <div className="reach-new-markets-image-one">
                                    <img src={image1} />
                                </div>
                                <div className="reach-new-markets-image-two">
                                    <img src={image2} />

                                </div>
                                <div className="reach-new-markets-image-three">
                                    <img src={image1} />

                                </div>
                                <div className="reach-new-markets-image-four">
                                    <img src={image2} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reach-new-markets-main">
                    <div className="row">

                        <div className="col-lg-7">
                            <div className="reach-new-markets-image-collage-main">
                                <div className="reach-new-markets-image">
                                    <img src={image3} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="reach-new-markets-title">
                                <div className="reach-new-markets-title-content">
                                    <h2>Showcase You Brand</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley </p>
                                </div>
                                <div className="reach-new-markets-title-two">
                                    <h2>500M+</h2>
                                    <h3>Daily Queries</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reach-new-markets-main">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="reach-new-markets-title">
                                <div className="reach-new-markets-title-content">
                                    <h2>Offer Services & Sell Products</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley </p>
                                </div>
                                <div className="reach-new-markets-title-two">
                                    <h2>12M+</h2>
                                    <h3>Sellers & Providers</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="reach-new-markets-image-collage-main">
                                <div className="reach-new-markets-image">
                                    <img src={image4} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="container">
                <div className="Donation-home-bottom-section">
                    <div className="Donation-home-bottom-section-title">
                        <h2>Real Businesses,<span className='real-result'> real results </span> </h2>
                    </div>
                    <div className="Donation-home-bottom-section-media">
                        <img src={media} />
                        <div className="donation-home-bottom-section-play-button">
                            <img src={play} />
                        </div>
                        <div className="donation-home-bottom-section-text">
                            <p>“Selling products on Opening Heart opened a new world and fulfilled my dreams”</p>
                        </div>
                    </div>

                </div>
                    <div className="donation-bottom-button">
                        <div className="donation-banner-button-inner">
                            <button>Start Selling Now</button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default DonationHomeSection3
