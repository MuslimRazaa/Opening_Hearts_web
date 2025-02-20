import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js";

// Your Stripe publishable key
const stripePromise = loadStripe("pk_test_51NdBQICxxJUWv23Vn91u1avmSwvGPbP6bST04iwpMRZwB6YV9phwegKfykbvdfmZQxD2x1ZEegbn0rongXPPZuDG000Jmrmnlx");

const PaymentRequestButton = () => {
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (!stripe) {
            console.error("Stripe is not initialized");
            return;
        }
    
        const pr = stripe.paymentRequest({
            country: "US",
            currency: "usd",
            total: {
                label: "Total Amount",
                amount: 5000,
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });
    
        pr.canMakePayment()
            .then((result) => {
                if (result) {
                    setPaymentRequest(pr);
                } else {
                    console.warn("canMakePayment returned null or false");
                }
            })
            .catch((error) => {
                console.error("Error with canMakePayment:", error);
            });
    }, [stripe]);

    if (!paymentRequest) {
        return <p>Loading payment options...</p>;
    }

    return (
        <div>
            <h2>Pay with Google Pay or Apple Pay</h2>
            <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
    );
};

const App = () => (
    <Elements stripe={stripePromise}>
        <PaymentRequestButton />
    </Elements>
);

export default App;