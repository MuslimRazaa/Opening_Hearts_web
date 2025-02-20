import React from 'react'
import Header from '../components/Layout/Header'
import SearchBar from '../components/Main/SearchBar'
import Banner from '../components/Main/Banner'
import Footer from '../components/Layout/Footer'
import TopCatagories from '../components/Main/TopCatagories'
import ProductToExplore from '../components/Main/ProductToExplore'
import TopRatedStores from '../components/Main/TopRatedStores'
import TrendingService from '../components/Main/TrendingService'
import DonateForHuman from '../components/Main/DonateForHuman'

function Index() {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <Banner/>
      <TopCatagories/>
      <ProductToExplore/>
      <TopRatedStores/>
      <TrendingService />
      <DonateForHuman/>
      <Footer/>
    </div>
  )
}

export default Index
