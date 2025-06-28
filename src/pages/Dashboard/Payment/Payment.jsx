import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_12345ABCDE67890fghij')

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
        </Elements>
    );
};

export default Payment;