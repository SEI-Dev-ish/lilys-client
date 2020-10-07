import React, { Component } from 'react'
import { showOrder } from './../../api/order'

class Order extends Component {
  constructor (props) {
    console.log('order props', props)
    super(props)
    this.state = {
      order: [],
      isInOrder: false,
      isLoaded: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    showOrder(user)
      .then(response => {
        console.log('response is', response.data)
        this.setState({
          order: response.data.orders,
          isInOrder: true,
          isLoaded: true
        })
      })
      .catch(console.error)
  }
  render () {
    console.log('orders is', this.state.order[7])
    const { orders } = this.state
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.order.length === 0) {
      jsx = <p>You have no pending orders at this moment</p>
    } else {
      jsx = (
        <ul>
          {this.state.order.map((order) => {
            return <li key={order._id}>{ orders }</li>
          })}
        </ul>
      )
    }
    return (
      <div>
        <h2>Current Order</h2>
        {jsx}
      </div>
    )
  }
}
export default Order
