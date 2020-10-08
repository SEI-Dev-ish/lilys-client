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
      flowerName: '',
      isLoaded: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    let orderCount = []
    // console.log('update order id', this.props)
    showOrder(user)
      .then(response => {
        if (response.data.order.length > 0) {
          orderCount = (response.data.order.length - 1) // look for incomplete
          console.log('last order index is', response.data.order)
          // console.log('last order id', response.data.order[orderCount]._id)
          console.log('last flower price', response.data.order[orderCount].flower[0].price)
          this.setState({
            isLoaded: true,
            orderId: response.data.order[orderCount]._id,
            orderPrice: response.data.order[orderCount].flower[0].price,
            isInOrder: true,
            orderQuantity: response.data.order[orderCount].flower[0].orderQuantity,
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
          isDeleted: true,
          orderId: ''
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    const { orderId, flowerName, orderPrice, orderQuantity } = this.state
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.orderId === '') {
      jsx = <h4>You have no orders at this time</h4>
    } else {
      jsx = (
        <div key={orderId}>
          <h2>Current Order</h2>
          <h5>{flowerName}</h5>
          <p>Price: ${orderPrice}</p>
          <p>Quantity: {orderQuantity}</p>
          <Button onClick={this.handleUpdate} variant="primary">Update Order</Button>
          <Button onClick={this.handleDestroy} variant="primary">Delete Order</Button>
        </div>
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
