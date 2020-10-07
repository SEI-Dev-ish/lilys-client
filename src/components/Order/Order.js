import React, { Component } from 'react'
import { showOrder } from './../../api/order'

class Order extends Component {
  constructor (props) {
    console.log('order props', props)
    super(props)
    this.state = {
      order: [],
      isInOrder: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    showOrder(user)
      .then(response => {
        console.log('response is', response.data.orders[0])
        this.setState({
          order: response.data.orders,
          isInOrder: true
        })
      })
      .catch(console.error)
  }
  render () {
    return (
      <div>
        <h2>Current Order</h2>
      </div>
    )
  }
}
export default Order
