import React from 'react'
import Header from '../../../components/Layout/Header'
import ProductDetailMaainPage from './ProductDetailMaainPage'
import Footer from '../../../components/Layout/Footer'
import KeepYourSupplier from './KeepYourSupplier'
import OtherRecomendations from './OtherRecomendations'

function ProductDetail() {
  return (
    <>
        <Header/>
        <ProductDetailMaainPage />
        <KeepYourSupplier/>
        <OtherRecomendations/>
        <Footer/>
    </>
  )
}
export default ProductDetail