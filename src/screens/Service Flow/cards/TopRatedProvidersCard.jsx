import React from 'react'
import img1 from '../../../media/images/fiver.png'
import userr from '../../../media/images/userrr.png'
import flag from '../../../media/images/United Kingdom (GB).png'
import star from '../../../media/images/star.svg'

function TopRatedProvidersCard() {
  return (
    <div className='topRatedServiceCardMain'>
      <div className="top-rated-service-img">
        <img src={img1} />
      </div>
      <div className="top-rated-card-profile">
        <div className="row justify-content-space-between align-item-center">
            <div className="col-lg-7">
                <div className="top-ratet-user-details">
                    <img src={userr} />
                    <h3>Mathew</h3>
                    <img src={flag} style={{width:"25px" , height:"20px"}}/>
                </div>
            </div>
            <div className="col-lg-3">
                <button className='top-rated-button'>Top Rated</button>
            </div>
        </div>
      </div>
      <div className="top-rated-card-description">
        <p>Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo. </p>
      </div>
      <div className="top-rated-card-rating">
        <div className="top-rated-star">
            <img src={star} style={{width:"18px"}} />
        </div>
        <div className="top-rated-rating">
          <h4>4.9<span style={{fontWeight:"100px" , color: "gray" , fontSize:"13px"}}>/5 (78)</span> </h4>
        </div>
      </div>
    </div>
  )
}

export default TopRatedProvidersCard
