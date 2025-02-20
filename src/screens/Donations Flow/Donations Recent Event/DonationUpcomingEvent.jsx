import React from 'react'
import recentimg1 from '../../../media/images/recentimg1.png';
import recentimg2 from '../../../media/images/recentimg2.png';
import recentarrow from '../../../media/images/recent-arrow.svg';

function DonationUpcomingEvent() {
  return (
    <div className='donation-upcoming-event'>
    <div className="container">
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
          <div className="col-md-4">
              <div className="card-recent">
                  <img src={recentimg1} alt="" />
                  <h2>Funding Cycle Harvest of Hope Gala</h2>
                    
                    <div className="read-both">
                    <button type='button' className='btn btn-readmore'>Read More</button>
                    <img src={recentarrow} alt="" />
                    </div>
                 
      
              
              </div>
          </div>
          <div className="col-md-4">
              <div className="card-recent">
                  <img src={recentimg2} alt="" />
                  <h2>Backpack Bonanza</h2>
                    
                    <div className="read-both">
                    <button type='button' className='btn btn-readmore'>Read More</button>
                    <img src={recentarrow} alt="" />
                    </div>
              </div>
          </div>
       
      </div>
    </div>
  </div>
  )
}

export default DonationUpcomingEvent
