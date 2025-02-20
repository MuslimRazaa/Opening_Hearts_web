import React from 'react'
import TopCatagoriesCard from './TopCatagoriesCard'
import ProductCard from './ProductCard'
import StoreCard from './StoreCard'
import ServicesCard from './ServicesCard'
import DonationCard from './DonationCard'
import TopCatSlider from './TopCatSlider'

function TopCatagories() {
  return (
    <>
      <div className='container'>
        <div className='top-catagoies-main'>
          <h1>Top Categories to explore</h1>
          <p>A platform that helps to make Everything accessible to all. It brings fashion to your doorstep!</p>
        </div>
        <TopCatSlider/>
      </div>
    </>
  )
}

export default TopCatagories
