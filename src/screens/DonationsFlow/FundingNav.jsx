import React from 'react'
import { Link } from 'react-router-dom'

function FundingNav({id}) {
    return (
        <div className='funding-nav-main'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="fund-nav">
                           
                                <ul className='sec-ul-one'>
                                    <li>
                                        <Link to={`/funding-cycle?id=${id}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to={`/funding-cycle-all?id=${id}`}>Campaigns</Link>
                                    </li>
                                    <li>
                                        <Link to={`/donation-event?id=${id}`}>Events</Link>
                                    </li>

                                </ul>
                          
                          
                                <ul className="sec-ul-two">
                                    {/* <li>
                                        <Link to="">Donate Now</Link>
                                    </li>
                                    <li>
                                        <Link to="">Become a Volunteer</Link>
                                    </li> */}
                                    

                                </ul>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FundingNav
