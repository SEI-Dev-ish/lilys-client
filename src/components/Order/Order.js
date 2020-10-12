import React, { Component, Fragment } from 'react'
import { showOrder } from './../../api/order'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import StripeCheckoutButton from './../stripe-button/stripe-button'
import messages from '../AutoDismissAlert/messages'
// import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51HaPCvIJomovXBOLEB0Alh9IUqrb26S9zpYfDo6awk6DkUkKYFxWuvJRzYBdnox4gf7xb6zWDohZB7r7Yf56kxus00s24ftdzM')

class Order extends Component {
  constructor (props) {
    // console.log('order props', props)
    super(props)
    this.state = {
      order: [],
      orderId: '',
      orderPrice: '',
      totalPrice: '',
      isInOrder: false,
      orderQuantity: 1,
      isDeleted: false,
      flowerName: '',
      isLoaded: true,
      isComplete: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    let orderCount = []
    // console.log('update order id', this.props)
    showOrder(user)
      .then(response => {
        // console.log(response)
        if (response.data.order.length > 0) {
          orderCount = (response.data.order.length - 1)
          this.setState({
            isLoaded: true,
            order: response.data.order,
            orderId: response.data.order[orderCount]._id,
            flowerPrice: response.data.order[orderCount].flower[0].price,
            orderPrice: response.data.order[orderCount].totalPrice,
            isInOrder: true,
            orderQuantity: response.data.order[orderCount].quantity,
            flowerName: response.data.order[orderCount].flower[0].name
          })
        } else {
          this.setState({
            orderId: '',
            isLoaded: true
          })
        }
      })
      .catch(console.error)
  }

  handleUp = (event) => {
    event.preventDefault()
    this.setState(() => {
      const newOrderQuantity = this.state.orderQuantity + 1
      const totalPrice = this.state.orderPrice + this.state.flowerPrice
      // console.log('newOrderQuantity', newOrderQuantity)
      return { orderQuantity: newOrderQuantity, orderPrice: totalPrice }
    })
  }
  handleUpdate = (event) => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/orders/${this.state.orderId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        order: {
          quantity: this.state.orderQuantity,
          totalPrice: this.state.orderPrice
        }
      },
      owner: this.props.user
    })
      .then(() => msgAlert({
        heading: 'Item Updated',
        message: 'Your item has been updated',
        variant: 'success'
      }))
      .catch(console.error)
    // console.log('updated quantity is 2', this.state.orderQuantity)
  }

  handleDown = (event) => {
    event.preventDefault()
    this.setState((prevState) => {
      const prevOrderQuantity = prevState.orderQuantity
      let newOrderQuantity = prevOrderQuantity
      if (prevOrderQuantity > 1) {
        newOrderQuantity = prevOrderQuantity - 1
      }
      const prevOrderPrice = prevState.orderPrice
      let totalPrice = prevOrderPrice
      if (prevOrderPrice > this.state.flowerPrice) {
        totalPrice = this.state.orderPrice - this.state.flowerPrice
      }
      return { orderQuantity: newOrderQuantity, orderPrice: totalPrice }
    })
  }
  handleDestroy = () => {
    axios({
      url: `${apiUrl}/orders/${this.state.orderId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({
          isDeleted: true,
          order: [],
          orderId: ''
        })
      })
      .catch(console.error)
  }
  handleComplete = () => {
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/orders/${this.state.orderId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        order: {
          orderQuantity: this.state.orderQuantity,
          totalPrice: this.state.totalPrice,
          isComplete: true
        }
      }
    })
      .then(response => {
        this.setState({
          order: [],
          orderId: '',
          orderPrice: '',
          totalPrice: '',
          isInOrder: false,
          orderQuantity: 0,
          isDeleted: false,
          flowerName: '',
          isLoaded: true,
          isComplete: false
        })
      })
      .then(() => msgAlert({
        heading: 'Order Placed',
        message: messages.completeOrder,
        variant: 'success'
      }))
      .catch(console.error)
  }
  render () {
    const incomplete = []
    for (let i = 0; i < this.state.order.length; i++) {
      if (this.state.order[i].isComplete === false) {
        incomplete.push(this.state.order[i])
      }
    }
    let jsx
    const { orderId, flowerName, orderPrice, orderQuantity } = this.state
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (incomplete.length === 0) {
      jsx = <h5>Your Cart Is Empty</h5>
    } else {
      jsx = (
        <Fragment>
          <div key={orderId}>
            <h2>Current Order</h2>
            <h5>{flowerName}</h5>
            <p>Price: ${orderPrice}</p>
            <p>Quantity: {orderQuantity}</p>
            <div className='quantity-buttons'>
              <Button onClick={this.handleUp} variant="primary">+</Button>
              <Button onClick={this.handleDown} variant="primary">-</Button>
            </div>
            <div className='order-buttons'>
              <Button onClick={this.handleUpdate} variant="primary">Update</Button>
              <Button onClick={this.handleDestroy} variant="primary">Delete Order</Button>
              <StripeCheckoutButton msgAlert={this.props.msgAlert} price={orderPrice} />
            </div>
          </div>
        </Fragment>
      )
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}
export default Order
