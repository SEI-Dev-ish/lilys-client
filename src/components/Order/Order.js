import React, { Component } from 'react'
import { showOrder } from './../../api/order'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class Order extends Component {
  constructor (props) {
    console.log('order props', props)
    super(props)
    this.state = {
      orderId: '',
      orderPrice: '',
      isInOrder: false,
      orderQuantity: 0,
      isDeleted: false,
      flowerName: ''
    }
  }

  componentDidMount () {
    const user = this.props.user
    let orderCount = []
    // console.log('update order id', this.props)
    showOrder(user)
      .then(response => {
        orderCount = (response.data.orders.length - 1) // look for incomplete
        console.log('last order index is', response.data.orders[orderCount])
        console.log('last order id', response.data.orders[orderCount]._id)
        console.log('last flower price', response.data.orders[orderCount].flower[0].price)
        this.setState({
          orderId: response.data.orders[orderCount]._id,
          orderPrice: response.data.orders[orderCount].flower[0].price,
          isInOrder: true,
          orderQuantity: response.data.orders[orderCount].flower[0].orderQuantity,
          flowerName: response.data.orders[orderCount].flower[0].name
        })
      })
      .catch(console.error)
  }
  handleUpdate = (event) => {
    event.preventDefault()
    console.log('handleUpdate', this.state.orderId, this.state.orderQuantity)
    console.log('update token', this.props.user.token)
    const updatedQuantity = 2 // how to update the quantity
    console.log('updatedQuantity is', updatedQuantity)
    this.setState({ // this does not update orderQuantity. Help.
      orderQuantity: updatedQuantity
    })
    console.log('updated quantity is', this.state.orderQuantity)
    console.log('flowerName is', this.state.flowerName)
    axios({
      url: `${apiUrl}/orders/${this.state.orderId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        order: {
          orderQuantity: updatedQuantity
        }
      },
      owner: this.props.user
    })
      .then((response) => console.log(response))
      .catch(console.error)
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
          isDeleted: true
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
        <Button onClick={this.handleUpdate} variant="primary">Update Order</Button>
        <Button onClick={this.handleDestroy} variant="primary">Delete Order</Button>
      </div>
    )
  }
}
export default Order
