// stripe.button.component.jsx
import React, { Fragment } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import apiUrl from './../../apiConfig'

const key = process.env.REACT_APP_STRIPE_KEY

const StripeCheckoutButton = (props) => {
  const price = props.price
  const priceForStripe = price * 100
  const publishableKey = key
  const onToken = token => {
    const cart = props.incart[0]
    const user = props.user
    const msgAlert = props.msgAlert
    axios({
      url: `${apiUrl}/orders/${cart._id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        order: {
          isComplete: true
        }
      }
    })
      .then(() => msgAlert({
        heading: 'Payment received',
        message: 'Your Order Has Been Placed, Thank You',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Paymet Failed',
        message: 'Payment Unsuccessful, Try Again',
        variant: 'danger'
      }))
  }

  return (
    <Fragment>
      <StripeCheckout
        label='Checkout'
        name='One Lily at a time...'
        billingAddress
        shippingAddress
        image='https://i.imgur.com/Vlpnpn5.jpg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
      />
    </Fragment>
  )
}

export default StripeCheckoutButton
