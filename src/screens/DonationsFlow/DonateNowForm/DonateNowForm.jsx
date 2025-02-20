import React from 'react'
import Header from '../../../components/Layout/Header'
import DonateFormSec from './DonateFormSec'
import Footer from '../../../components/Layout/Footer'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISH_KEY } from '../../../utils/api'

function DonateNowForm({data}) {
  const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);
  return (
    <div>
      <Header/>
      <Elements stripe={stripePromise}>
        <DonateFormSec data={data}/>
      </Elements>

      <Footer/>

    </div>
  )
}

export default DonateNowForm
