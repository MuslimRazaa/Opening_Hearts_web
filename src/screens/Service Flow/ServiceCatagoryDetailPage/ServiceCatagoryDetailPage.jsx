import React from 'react'
import Header from '../../../components/Layout/Header'
import ServiceProviderDropdowns from '../ServiceProviderFlow/ServiceProviderDropdowns'
import ServiceProviderCardsSection from '../ServiceProviderFlow/ServiceProviderCardsSection'
import RelatedSearchServiceProvider from '../ServiceProviderFlow/RelatedSearchServiceProvider'
import ServiceProviderBrowserSearch from '../ServiceProviderFlow/ServiceProviderBrowserSearch'
import Footer from '../../../components/Layout/Footer'
import ServiceCatagoryCardSection from './ServiceCatagoryCardSection'

function ServiceCatagoryDetailPage() {
  return (
    <>
     <Header/>
     <ServiceProviderDropdowns/>
     <ServiceCatagoryCardSection/>
     <RelatedSearchServiceProvider />
     <ServiceProviderBrowserSearch/>
     <Footer/>
    </>
  )
}

export default ServiceCatagoryDetailPage
