import React from 'react'
import Header from '../../../components/Layout/Header'
import ButtonsAndSearch from '../../../components/Main/ButtonsAndSearch'
import PopularServiceCardsFilter from './PopularServiceCardsFilter'
import Footer from '../../../components/Layout/Footer'
import Newsletter from '../../../components/Main/Newsletter'

function PopularService() {
  return (
    <div>
        <Header/>
        <ButtonsAndSearch/>
        <PopularServiceCardsFilter/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default PopularService
