import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from './../../apiConfig'
import { showOrder } from './../../api/order'

class OrderHistory extends Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {
      order: [],
      isLoaded: false,
      isComplete: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    showOrder(user)
      .then(response => {
        console.log(response)
        this.setState({
          order: response.data.order,
          isLoaded: true
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p><em>Loading...</em></p>
    } else if (this.state.order.length === 0) {
      jsx = <p>You Have No Past Orders</p>
    } else {
      for (let i = 0; i < this.state.order.length; i++) {
        jsx = <div>
          <h5>Here Is Your Order History</h5>
          <div>
            <ol>
              <li><h6>Order Id: {this.state.order[i]._id}</h6></li>
              {this.state.order[i].flower.map(({ _id, name, price }) => (
                <span key={_id}>
                  <h6>Flower: {name} ${price}</h6>
                </span>
              ))}
              <p>Total Price: {this.state.order[i].totalPrice}</p>
            </ol>
          </div>
        </div>
      }
    }
    return (
      <div>
        <h1>Order History</h1>
        {jsx}
      </div>
    )
  }
}
export default OrderHistory
