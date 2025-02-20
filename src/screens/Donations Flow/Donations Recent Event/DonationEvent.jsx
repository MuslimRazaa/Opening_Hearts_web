import React from 'react'
import HeaderTop from '../../../components/Layout/HeaderTop'
import HeaderNavbar from '../../../components/Layout/HeaderNavbar'
import FundingCycleHeader from '../FundingCycleHeader'
import DonationBannerSec from '../DonationBannerSec'
import FundingNav from '../FundingNav'
import DonationRecentEvent from './DonationRecentEvent'
import DonationUpcomingEvent from './DonationUpcomingEvent'
import Footer from '../../../components/Layout/Footer'

function DonationEvent() {
  return (
    <div>
        <HeaderTop/>
        <HeaderNavbar/>
        <FundingCycleHeader/>
        <DonationBannerSec/>
        <FundingNav/>  
        <DonationRecentEvent/>      
        <DonationUpcomingEvent/>
        <Footer/>
      
    </div>
  )
}

export default DonationEvent

