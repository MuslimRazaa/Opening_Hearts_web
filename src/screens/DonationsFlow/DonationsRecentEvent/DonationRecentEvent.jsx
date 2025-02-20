import React from 'react'
import recentimg1 from '../../../media/images/recentimg1.png';
import recentimg2 from '../../../media/images/recentimg2.png';
import recentimg3 from '../../../media/images/recentimg3.png';
import recentarrow from '../../../media/images/recent-arrow.svg';
import { Link } from 'react-router-dom';

function DonationRecentEvent({recent}) {
  return (
    <div className='donation-recent-event'>
      <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="dona-recent-head">
                    <h1>
                    Recent Events
                    </h1>
                </div>
            </div>
        </div>
        {recent?.length > 0 ? 
        (<div className="row">
           {recent?.map((item) => (

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
        </div>) : "No Events Available"}
      </div>
    </div>
  )
}

export default DonationRecentEvent
