import React from 'react'
import Header from '../../../components/Layout/Header'
import ProductDetailMaainPage from './ProductDetailMaainPage'
import Footer from '../../../components/Layout/Footer'
import KeepYourSupplier from './KeepYourSupplier'
import OtherRecomendations from './OtherRecomendations'
import { useLocation } from 'react-router-dom'

function ProductDetail() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const guid = queryParams.get('guid');
  
  return (
    <>
        <Header/>
        <ProductDetailMaainPage guid={guid}/>
        {/* <KeepYourSupplier/> */}
        {/* <OtherRecomendations guid={guid}/> */}
        <Footer/>
    </>
  )
}
export default ProductDetail