import React from 'react'
import Header from '../../../components/Layout/Header'
import ServiceSellerProfileTop from './ServiceSellerProfileTop'
import AboutMethew from './AboutMethew'
import GetToKnowAbtMethew from './GetToKnowAbtMethew'
import OtherRecomendationsForSeller from './OtherRecomendationsForSeller'
import Footer from '../../../components/Layout/Footer'
import SingleServiceFaqs from '../SingleServiceDetailPage/SingleServiceFaqs'
import ServicePackageTable from './ServicePackageTable'
import PackageSecMain from './PackageSecMain'

function ServiceSelerProfileTwo() {
  return (
    <div>
         <Header/>
        <ServiceSellerProfileTop available={true} />
        <PackageSecMain/>
        <AboutMethew/>
        <GetToKnowAbtMethew/>
        <ServicePackageTable/>
        <SingleServiceFaqs />
        <OtherRecomendationsForSeller/>
        <Footer/>
    </div>
  )
}

export default ServiceSelerProfileTwo
