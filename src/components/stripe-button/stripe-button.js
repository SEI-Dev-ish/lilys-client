// stripe.button.component.jsx
import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class StripeCheckoutButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isComplete: false
    }
  }
  onToken = token => {
    const cart = this.props.incart[0]
    const user = this.props.user
    const msgAlert = this.props.msgAlert
    axios({
      url: `${apiUrl}/orders/${cart._id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        order: {
          orderQuantity: this.state.orderQuantity,
          totalPrice: this.state.totalPrice,
          isComplete: true
        }
      }
    })
      .then(() => msgAlert({
        heading: 'Payment received',
        message: 'Thank you, please click Complete Order',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Paymet Failed',
        message: 'Payment Unsuccessful, Try Again',
        variant: 'danger'
      }))
  }
  render () {
    const price = this.props.price
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb'
    return (
      <StripeCheckout
        label='Checkout'
        name='One Lily at a time...'
        billingAddress
        shippingAddress
        image='https://i.imgur.com/Vlpnpn5.jpg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={this.onToken}
        stripeKey={publishableKey}
      />
    )
  }
}

export default StripeCheckoutButton
