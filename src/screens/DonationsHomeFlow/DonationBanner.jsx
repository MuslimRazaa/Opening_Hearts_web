import React from 'react'
import openingHeartsTextLogo from '../../media/images/Group 1000002789.png'
import { Link } from 'react-router-dom'

function DonationBanner() {
  return (
    <div className='banner-donation-home-page'>
      <div className="container">
       <div className="donation-banner-text-title">
        <h2>SCALE YOUR <span className='bussiness-gradient-text'>BUSINESS</span> WITH</h2>
      </div>
      <div className="donation-banner-text-icon">
        <img src={openingHeartsTextLogo} />
        <h4>DIGITAL GATEWAY</h4>
      </div>
      <div className="donation-banner-button">
        <div className="donation-banner-button-inner">
       <Link to='/select-your-domain' ><button>Start Selling Now</button></Link>     
        </div>
      </div>
      </div>
    </div>
  )
}

export default DonationBanner
