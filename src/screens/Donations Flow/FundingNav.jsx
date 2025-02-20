import React from 'react'

function FundingNav() {
    return (
        <div className='funding-nav-main'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="fund-nav">
                           
                                <ul className='sec-ul-one'>
                                    <li>
                                        <a href="#">Home</a>
                                    </li>
                                    <li>
                                        <a href="#">Campaigns</a>
                                    </li>
                                    <li>
                                        <a href="#">Events</a>
                                    </li>

                                </ul>
                          
                          
                                <ul className="sec-ul-two">
                                    <li>
                                        <a href="#">Donate Now</a>
                                    </li>
                                    <li>
                                        <a href="#">Become a Volunteer</a>
                                    </li>
                                    

                                </ul>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FundingNav
