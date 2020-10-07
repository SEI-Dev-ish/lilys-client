import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Order extends Component {
  constructor (props) {
    console.log('order props', props)
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <h2>Current Order</h2>
        <Link to='/order-history'>Order History</Link>
      </div>
    )
  }
}
export default Order
