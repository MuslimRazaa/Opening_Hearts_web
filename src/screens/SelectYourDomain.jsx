import React from 'react'
import Footer from '../components/Layout/Footer'
import HeaderTop from '../components/Layout/HeaderTop'
import SelectYourDomainBanner from '../components/Main/SelectYourDomainBanner'
import SelectYourDomainCards from '../components/Main/SelectYourDomainCards'
import Header from '../components/Layout/Header'

function SelectYourDomain() {
  return (
    <div>
    <Header/>
     <SelectYourDomainBanner/>
     <SelectYourDomainCards/>
      <Footer/>
    </div>
  )
}

export default SelectYourDomain
