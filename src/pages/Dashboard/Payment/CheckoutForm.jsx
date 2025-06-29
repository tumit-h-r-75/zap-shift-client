import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecoure from '../../../hooks/useAxiosSecoure';
import Loader from '../../../components/Loader';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecoure = useAxiosSecoure();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecoure.get(`/parcels/${id}`)
            return res.data
        }
    })
    if (isPending) {
        return <Loader></Loader>
    }

    console.log(parcelInfo);

    const amount = parcelInfo.cost

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!stripe || !elements) {
            return;
        }


        const card = elements.getElement(CardElement);
        if (!card) {
            return
        }
        // vaslidate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)
        }
        else {
            setError('')
            console.log('paymentMathod', paymentMethod);
            // create payment intent
            const res = await axiosSecoure.post('/create-payment-intent', {
                amount: parseInt(parcelInfo.cost),
                id
            })

            const clientSecret = res.data.clientSecret;

            // confrem payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);

            } else if (result.paymentIntent.status === "succeeded") {
                setError('');
                console.log(" Payment successful:", result.paymentIntent);

                const paymentData = {
                    transactionId: result.paymentIntent.id,
                    amount: amount,
                    email: user?.email,
                    parcelId: parcelInfo?._id,
                    date: new Date(),
                };

                const saveRes = await axiosSecoure.post("/save-payment", paymentData);

                if (saveRes.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `<b>Transaction ID:</b> ${result.paymentIntent.id}`,
                        confirmButtonText: 'Go to My Parcels',
                        confirmButtonColor: '#22c55e',
                    }).then(() => {
                        navigate('/dashboard/myParcels');
                    });
                }
            }
        }


    }


    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border border-lime-300">
            <h2 className="text-xl font-semibold mb-4 text-center text-lime-600">Payment Details</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-2 border-lime-300 rounded-md p-4">
                    <CardElement className="p-2" />
                </div>
                {
                    error && <p className='text-center'>{error}</p>
                }

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full py-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Pay ${amount} for Parcel Pickup
                </button>
            </form>
        </div>

    );
};

export default CheckoutForm;