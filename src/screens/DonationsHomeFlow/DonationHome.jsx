import React from 'react'
import Header from '../../components/Layout/Header'
import DonationBanner from './DonationBanner'
import DonationBannerTwo from './DonationBannerTwo'
import DonationHomeSection3 from './DonationHomeSection3'
import Footer from '../../components/Layout/Footer'

function DonationHome() {
  return (
    <div>
      <Header/>
      <DonationBanner/>
      <DonationBannerTwo/>
      <DonationHomeSection3/>
      <Footer/>
    </div>
  )
}

export default DonationHome
