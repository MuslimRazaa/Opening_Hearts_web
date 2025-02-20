import React from 'react'
import Header from '../../components/Layout/Header'
import BillingDetailsForm from './BillingDetailsForm'
import CheckoutRight from '../CheckoutFlow/checkoutRight'
import Footer from '../../components/Layout/Footer'

function AddBillingDetails() {
    return (
        <>
            <Header />
                <div className="container">
            <div className="billing-details-main">
                    <div className="row">
                        <div className="col-lg-7">
                            <h2 className="billing-title">Billing Details</h2>
                        </div>
                        <div className="col-lg-5"></div>
                        <div className="col-lg-7">
                            <BillingDetailsForm />
                        </div>
                        <div className="col-lg-5">
                            <CheckoutRight />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddBillingDetails
