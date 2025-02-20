import React from 'react'
import Header from '../../components/Layout/Header'
import CheckoutSection2 from './CheckoutSection2'
import Footer from '../../components/Layout/Footer'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './PaymentRequestButton';
import { STRIPE_PUBLISH_KEY } from '../../utils/api';


const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

function CheckOut() {
  return (
    <div>
      <Header />
      <Elements stripe={stripePromise}>
        <CheckoutSection2 />
      </Elements>
      <Footer />
    </div>
  )
}

export default CheckOut
