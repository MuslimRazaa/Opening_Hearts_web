import React from 'react'
import Header from '../../../components/Layout/Header'
import ProductDetailMaainPage from './ProductDetailMaainPage'
import KeepYourSupplier from './KeepYourSupplier'
import OtherRecomendations from './OtherRecomendations'
import Footer from '../../../components/Layout/Footer'
import HeaderTop from '../../../components/Layout/HeaderTop'
import ProductPriviewComponent from './ProductPriviewComponent'

function ProductPreviewDetailPage() {
    return (
        <div>
            <HeaderTop />
            <ProductPriviewComponent />
            <OtherRecomendations />
            <Footer />
        </div>
    )
}

export default ProductPreviewDetailPage
