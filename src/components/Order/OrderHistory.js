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
    const complete = []
    for (let i = 0; i < this.state.order.length; i++) {
      if (this.state.order[i].isComplete === true) {
        complete.push(this.state.order[i])
      }
    }
    console.log(complete)
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p><em>Loading...</em></p>
    } else if (complete.length === 0) {
      jsx = <p>You Have No Past Orders</p>
    } else {
      jsx =
      <ol>
        {complete.map(({ _id, flower, totalPrice }) => (
          <div key={_id}>
            <li id={_id}>Order # {_id}</li>
            {flower.map(({ index, id, name, price }) => (
              <span key={index}>
                <p id={id}>Flower: {name} ${price}</p>
              </span>
            ))}
            <p>Total Price ${totalPrice}</p>
          </div>
        ))}
      </ol>
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
