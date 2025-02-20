import React from 'react'
import ServiceBillingPage from '../ServiceBillingPage'
import { STRIPE_PUBLISH_KEY } from '../../../utils/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function ServiceBillingMain() {

    const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);
    return (
        <div>
            <Elements stripe={stripePromise}>
                <ServiceBillingPage />
            </Elements>
        </div>
    )
}

export default ServiceBillingMain
