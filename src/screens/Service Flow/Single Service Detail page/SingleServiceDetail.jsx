import React from 'react'
import Header from '../../../components/Layout/Header'
import SearchBar from '../../../components/Main/SearchBar'
import SingleServiceBanner from './SingleServiceBanner'
import SingleServiceTopButtonsSlider from './SingleServiceTopButtonsSlider'
import Footer from '../../../components/Layout/Footer'
import SingleServiceFaqs from './SingleServiceFaqs'

function SingleServiceDetail() {
  return (
    <>
      <Header/>
      <SearchBar/>
      <SingleServiceBanner/>
      <SingleServiceTopButtonsSlider/>
      <SingleServiceFaqs />
      <Footer/>
      
    </>
  )
}

export default SingleServiceDetail
