import React from 'react'
import Header from '../../components/Layout/Header'
import SearchBar from '../../components/Main/SearchBar'
import Banner from '../../components/Main/Banner'
import ProductToExplore from '../../components/Main/ProductToExplore'
import TopCatagories from '../../components/Main/TopCatagories'
import TopRatedStores from '../../components/Main/TopRatedStores'
import TrendingService from '../../components/Main/TrendingService'
import DonateForHuman from '../../components/Main/DonateForHuman'
import Footer from '../../components/Layout/Footer'
import Newsletter from '../../components/Main/Newsletter'
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
const Home = () => {

  // Register the plugin with GSAP
gsap.registerPlugin(ScrollToPlugin);


  return (
    <div className="home">
        <div className="homw-wrap">
              <Header/>
              <SearchBar/>
              <Banner/>
              <TopCatagories />
              <ProductToExplore/>
              <TopRatedStores/>
              <TrendingService/>
              <DonateForHuman/>
              <Newsletter/>
              <Footer/>
        </div>
    </div>
  )
}

export default Home
