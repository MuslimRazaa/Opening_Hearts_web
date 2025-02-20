import React from 'react'
import Header from '../../../../components/Layout/Header'
import BuySubFrom from './BuySubFrom'
import Footer from '../../../../components/Layout/Footer'
import HeaderTop from '../../../../components/Layout/HeaderTop'

const BuymonthlySubcribtion = () => {
  return (
    <div>
      <HeaderTop/>
      <BuySubFrom link={false} verification={false}/>
      <Footer/>
    </div>
  )
}

export default BuymonthlySubcribtion
