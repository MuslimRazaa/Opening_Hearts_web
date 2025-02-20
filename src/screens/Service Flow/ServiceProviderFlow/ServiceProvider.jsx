import React from 'react'
import Header from '../../../components/Layout/Header'
import ServiceProviderDropdowns from './ServiceProviderDropdowns'
import ServiceProviderCardsSection from './ServiceProviderCardsSection'
import RelatedSearchServiceProvider from './RelatedSearchServiceProvider'
import Footer from '../../../components/Layout/Footer'
import ServiceProviderBrowserSearch from './ServiceProviderBrowserSearch'

function ServiceProvider() {
  return (
    <>
     <Header/>
     <ServiceProviderDropdowns/>
     <ServiceProviderCardsSection/>
     <RelatedSearchServiceProvider />
     <ServiceProviderBrowserSearch/>
     <Footer/>
    </>
  )
}

export default ServiceProvider
