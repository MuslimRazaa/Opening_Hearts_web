import React from 'react'
import Header from '../../../components/Layout/Header'
import Footer from '../../../components/Layout/Footer'
import BecomeVolunteerForm from './BecomeVolunteerForm'
import BecomeVolunteerFormBanner from './BecomeVolunteerFormBanner'

function BecomeVolunteer() {
  return (
    <div>
        <Header/>
        <BecomeVolunteerFormBanner/>
        <BecomeVolunteerForm/>
        <Footer/>
    </div>
  )
}

export default BecomeVolunteer
