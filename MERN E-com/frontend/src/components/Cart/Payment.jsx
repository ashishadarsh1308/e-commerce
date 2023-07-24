import React, { Fragment, useRef } from 'react'
import './Payment.css'
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiFillCreditCard, AiOutlineCalendar } from 'react-icons/ai'
import { BsFillKeyFill } from 'react-icons/bs'

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const dispatch = useDispatch()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)

    const payBtn = useRef(null)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {

        e.preventDefault()
        payBtn.current.disabled = true

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const { data } = await axios.post('/api/v1/payment/process', paymentData, config);

            const clientSecret = data.client_secret;

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.postalCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message);
            } else {
                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    // const paymentData = {
                    //     id: result.paymentIntent.id,
                    //     status: result.paymentIntent.status
                    // }

                    // dispatch(createOrder(paymentData))

                    navigate('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }


        } catch (error) {
            payBtn.current.disabled = false
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title='Payment' />
            <CheckoutSteps activeStep={2} />
            <div className="PaymentContainer">
                <form
                    className="PaymentForm"
                    onSubmit={(e) => submitHandler(e)}
                >
                    <h1>Card Info</h1>
                    <div>
                        <AiFillCreditCard />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <AiOutlineCalendar />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <BsFillKeyFill />
                        <CardCvcElement className='paymentInput' />
                    </div>

                    <input
                        type="submit"
                        value={`pay - ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment