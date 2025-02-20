import React from 'react'
import beachbanner from '../../../media/images/beach-banner.png'
import { Link } from 'react-router-dom'

function DonationBeachFirstSec({ data }) {
    return (
        <>
            <div className='beach-first-sec'>
                <img src={data?.cover_image} alt="" />
                <div className="container">
                    <div className="row align-items-center mt-5" >
                        <div className="col-md-9">

                            <h1>{data?.name}</h1>
                            <p>
                                {data?.new_created_at}
                            </p>

                        </div>
                        <div className="col-md-3">
                            <div className="beachhead-sec2">
                                <h2>
                                    {data?.volunteer_count}
                                </h2>
                                <p>Volunteers</p>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">

                                <div
                                    className="secbeach2-text"
                                    dangerouslySetInnerHTML={{ __html: data?.objectives }}
                                ></div>

                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <div className="secbeach2-text">
                                <h3>
                                    Date and Time
                                </h3>

                                <ul>
                                    <li><b>Start Date: </b>{data?.start_date}</li>
                                    <li><b>Time: </b>{data?.time}</li>
                                    <li><b>End Date: </b>{data?.end_date}</li>
                                </ul>



                            </div>

                        </div>


                        <div className="col-md-4">
                            <div className="beach-datetime">
                               <Link to={"/become-a-volunteer"} ><h4>Become a Volunteer</h4></Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default DonationBeachFirstSec
