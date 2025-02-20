import React from 'react'
import recentimg1 from '../../../../media/images/recentimg1.png';
import recentimg2 from '../../../../media/images/recentimg2.png';
import recentimg3 from '../../../../media/images/recentimg3.png';
import recentarrow from '../../../../media/images/recent-arrow.svg';
import { Link } from 'react-router-dom';

const DonationEventSectionFirst = () => {
    return (
        <>
            <div className='event-main-dash-donation'>
                <div className="row">
                    <div className="col-md-8">
                        <div className="event-main-dash-donation-text">
                            <h1>Start Uploading Events</h1>
                            <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                                "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                            <button type='button' className='btn-add-event'>Add a new Events </button>
                        </div>
                    </div>
                </div>
                <div className="donation-dash-recent-event">
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h2>Recent Events</h2>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div className="card-recent-dash-event">
                                <img src={recentimg1} alt="" />
                                <h3>Funding Cycle Harvest of Hope Gala</h3>

                                <div className="read-bothdash-event">
                                    <Link to="/donation-dashboard/donation-add-events" style={{ textDecoration: "none" }}><button type='button' className='btn btn-readmore-dash'>Read More</button></Link>
                                    <img src={recentarrow} alt="" />
                                </div>



                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-recent-dash-event">
                                <img src={recentimg2} alt="" />
                                <h3>Backpack Bonanza</h3>

                                <div className="read-bothdash-event">
                                    <Link to="/donation-dashboard/donation-add-events" style={{ textDecoration: "none" }}><button type='button' className='btn btn-readmore-dash'>Read More</button></Link>
                                    <img src={recentarrow} alt="" />
                                </div>



                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-recent-dash-event">
                                <img src={recentimg3} alt="" />
                                <h3>Pet Parade Fundraiser</h3>

                                <div className="read-bothdash-event">
                                    <Link to="/donation-dashboard/donation-add-events" style={{ textDecoration: "none" }}><button type='button' className='btn btn-readmore-dash'>Read More</button></Link>
                                    <img src={recentarrow} alt="" />
                                </div>



                            </div>
                        </div>
                    </div>

                </div>
                {/* upcoming Event */}
                <div className="donation-dash-upcoming-event">
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <h2>Upcoming Events</h2>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div className="card-recent-dash-event">
                                <img src={recentimg1} alt="" />
                                <h3>Funding Cycle Harvest of Hope Gala</h3>

                                <div className="read-bothdash-event">
                                    <Link to="/donation-dashboard/donation-add-events" style={{ textDecoration: "none" }}><button type='button' className='btn btn-readmore-dash'>Read More</button></Link>
                                    <img src={recentarrow} alt="" />
                                </div>



                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-recent-dash-event">
                                <img src={recentimg2} alt="" />
                                <h3>Backpack Bonanza</h3>

                                <div className="read-bothdash-event">
                                    <Link to="/donation-dashboard/donation-add-events" style={{ textDecoration: "none" }}><button type='button' className='btn btn-readmore-dash'>Read More</button></Link>
                                    <img src={recentarrow} alt="" />
                                </div>



                            </div>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default DonationEventSectionFirst
