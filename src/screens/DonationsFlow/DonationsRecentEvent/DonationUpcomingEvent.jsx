import React from 'react'
import recentimg1 from '../../../media/images/recentimg1.png';
import recentimg2 from '../../../media/images/recentimg2.png';
import recentarrow from '../../../media/images/recent-arrow.svg';
import { Link } from 'react-router-dom';

function DonationUpcomingEvent({upcomming}) {
  return (
    <div className='donation-upcoming-event'>
    {upcomming?.length > 0 ? (<div className="container">
      <div className="row">
          <div className="col-md-12">
              <div className="dona-recent-head">
                  <h1>
                  Upcoming Events
                  </h1>
              </div>
          </div>
      </div>
      <div className="row">
        {upcomming?.map((item) => (
          <div className="col-md-4">
              <div className="card-recent">
                  <img src={item?.cover_image} alt="" />
                  <h2>{item?.name}</h2>
                    
                    <div className="read-both">
                   <Link to={`/donation-beach-clean?id=${item?.id}`} style={{textDecoration:"none"}}><button type='button' className='btn btn-readmore'>Read More</button></Link> 
                    <img src={recentarrow} alt="" />
                    </div>

              </div>
          </div>))}
          {/* <div className="col-md-4">
              <div className="card-recent">
                  <img src={recentimg2} alt="" />
                  <h2>Backpack Bonanza</h2>
                    
                    <div className="read-both">
                    <Link to="/donation-beach-clean" style={{textDecoration:"none"}}><button type='button' className='btn btn-readmore'>Read More</button></Link> 
                    <img src={recentarrow} alt="" />
                    </div>
              </div>
          </div> */}
       
      </div>
    </div>) : "No Events Available Right Now"}
  </div>
  )
}

export default DonationUpcomingEvent
