import React, { Component } from 'react'
// import axios from 'axios'
// import apiUrl from './../../apiConfig'
import { showOrder } from './../../api/order'

class OrderHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    const user = this.props.user
    showOrder(user)
      .then(response => {
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
      jsx = <div>
        <h5>Here Is Your Order History</h5>
        <ol>
          {this.state.order.map(({ _id, flower, totalPrice }) => (
            <div key={_id}>
              <li id={_id}>Flowers: {flower}</li>
              <p>Total Price: {totalPrice}</p>
            </div>
          ))}
        </ol>
      </div>
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
