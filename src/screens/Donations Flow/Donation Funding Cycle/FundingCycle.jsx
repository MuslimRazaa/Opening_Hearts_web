import React from 'react'
import HeaderTop from '../../../components/Layout/HeaderTop'
import FundingCycleHeader from '../FundingCycleHeader'
import HeaderNavbar from '../../../components/Layout/HeaderNavbar'
import DonationBannerSec from '../DonationBannerSec'
import FundingNav from '../FundingNav'
import FundAboutOrganization from './FundAboutOrganization'
import DonationFundingCycleSec from './DonationFundingCycle3rdSec'

function FundingCycle() {
  return (
    <div>
         <HeaderTop/>
         <HeaderNavbar/>
         <FundingCycleHeader/>
         <DonationBannerSec/>
         <FundingNav/>
        <FundAboutOrganization/>
        <DonationFundingCycleSec/>
      
    </div>
  )
}

export default FundingCycle
