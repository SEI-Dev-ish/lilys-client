import React, { Component } from 'react'
import { showOrder } from './../../api/order'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import messages from '../AutoDismissAlert/messages'

class Order extends Component {
  constructor (props) {
    console.log('order props', props)
    super(props)
    this.state = {
      orderId: '',
      orderPrice: '',
      totalPrice: '',
      isInOrder: false,
      orderQuantity: 1,
      isDeleted: false,
      flowerName: '',
      isLoaded: false,
      isComplete: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    let orderCount = []
    // console.log('update order id', this.props)
    showOrder(user)
      .then(response => {
        console.log(response)
        if (response.data.order.length > 0) {
          orderCount = (response.data.order.length - 1)
          this.setState({
            isLoaded: true,
            orderId: response.data.order[orderCount]._id,
            orderPrice: response.data.order[orderCount].flower[0].price,
            isInOrder: true,
            orderQuantity: response.data.order[orderCount].quantity,
            flowerName: response.data.order[orderCount].flower[0].name,
            isComplete: response.data.order.isCompelte
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
      console.log('newOrderQuantity', newOrderQuantity)
      return { orderQuantity: newOrderQuantity }
    })
  }
  handleUpdate = (event) => {
    axios({
      url: `${apiUrl}/orders/${this.state.orderId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        order: {
          quantity: this.state.orderQuantity
        }
      },
      owner: this.props.user
    })
      .then((response) => console.log(response))
      .catch(console.error)
    console.log('updated quantity is 2', this.state.orderQuantity)
  }

  handleDown = (event) => {
    event.preventDefault()
    this.setState((prevState) => {
      const prevOrderQuantity = prevState.orderQuantity
      let newOrderQuantity = prevOrderQuantity
      if (prevOrderQuantity > 1) {
        newOrderQuantity = prevOrderQuantity - 1
      }
      return { orderQuantity: newOrderQuantity }
    })
    console.log('updated quantity is', this.state.orderQuantity)
    console.log('flowerName is', this.state.flowerName)
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
  handleComplete = () => {
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
          orderId: '',
          orderPrice: '',
          totalPrice: '',
          isInOrder: false,
          orderQuantity: 0,
          isDeleted: false,
          flowerName: '',
          isLoaded: true
        })
      })
  }
  render () {
    console.log('render quantity', this.state.orderQuantity)
    let jsx
    const { orderId, flowerName, orderPrice, orderQuantity } = this.state
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else if (this.state.orderId === '' || this.state.isComplete === true) {
      jsx = <p>You have no orders at this time</p>
    } else {
      jsx = (
        <div key={orderId}>
          <h2>Current Order</h2>
          <h5>{flowerName}</h5>
          <p>Price: ${orderPrice}</p>
          <p>Quantity: {orderQuantity}</p>
          <Button onClick={this.handleUp} variant="primary">Up</Button>
          <Button onClick={this.handleUpdate} variant="primary">Update</Button>
          <Button onClick={this.handleDown} variant="primary">Down</Button>
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
