import React from 'react'
import fundimgslide1 from '../../../media/images/slider-fund1.png';
import fundimgslide2 from '../../../media/images/slider-fund2.png';
import fundimgslide3 from '../../../media/images/slider-fund3.png';
import fundimgslide4 from '../../../media/images/slider-fund4.png';

function FundAboutOrganization() {
    return (
        <div className='fund-about-organize'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <h1>About Organization</h1>

                        <div className="funding-slider">
                            <div className="row">
                                <div className="col-md-3">
                                    <img src={fundimgslide1} alt="" />
                                </div>
                                <div className="col-md-3">
                                    <img src={fundimgslide2} alt="" />
                                </div>
                                <div className="col-md-3">
                                    <img src={fundimgslide3} alt="" />
                                </div>
                                <div className="col-md-3">

                                    <img src={fundimgslide4} alt="" />
                                </div>
                            </div>

                        </div>

                        <div className="text-campaigns">

                            <div className="row">
                                <div className="col-md-9">
                                    <p>
                                        Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.
                                        Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.
                                    </p>
                                </div>
                                <div className="col-md-3">
                                    <div className="both-camp-txt">
                                        <h2>
                                            78+
                                        </h2>
                                        <p>Campaigns</p>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FundAboutOrganization
