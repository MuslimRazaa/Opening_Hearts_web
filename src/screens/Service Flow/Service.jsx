import React from 'react'
import Header from '../../components/Layout/Header'
import SearchBar from '../../components/Main/SearchBar'
import ServiceBanner from './ServiceBanner'
import ServiceSection2 from './ServiceSection2'
import PopularServiceCardSec from './PopularServiceCardSec'
import TrendinService from './TrendinServiceSlider'
import TopRatedProvidersCard from './cards/TopRatedProvidersCard'
import TopRatedSection from './TopRatedSection'
import ServiceSection5 from './ServiceSection5'
import Footer from '../../components/Layout/Footer'

function Service() {
  return (
    <div className='service'>
      <Header/>
      <SearchBar/>
      <ServiceBanner/>
      <ServiceSection2/>
      <PopularServiceCardSec/>
      <TopRatedSection/>
      <TrendinService/>
      <ServiceSection5/>
      <Footer/>

    </div>
  )
}

export default Service
