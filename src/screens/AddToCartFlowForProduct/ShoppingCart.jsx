import React, { useEffect, useState } from 'react'
import ShoppingCartCard from './ShoppingCartCard'
import Header from '../../components/Layout/Header'
import ShoppingCartSectionTwo from './ShoppingCartSectionTwo'
import SliderOneDetailPage from '../FeatureProduct/ProductDetail/slider_other-recomendations/SliderOneDetailPage'
import Footer from '../../components/Layout/Footer'
import { checkOutCart } from '../../utils/api'

function ShoppingCart() {

  return (
    <div>
      <Header />
      <ShoppingCartSectionTwo/>
      <Footer />
    </div>
  )
}

export default ShoppingCart;
