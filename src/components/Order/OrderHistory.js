import React, { Component } from 'react'
import { showOrder } from './../../api/order'

class OrderHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order: []
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
    // console.log(this.state.order)
    const complete = []
    for (let i = 0; i < this.state.order.length; i++) {
      if (this.state.order[i].isComplete === true) {
        complete.push(this.state.order[i])
      }
    }
    let jsx
    if (this.state.isLoaded === false) {
      jsx = <p><em>Loading...</em></p>
    } else if (complete.length === 0) {
      jsx = <p>You Have No Past Orders</p>
    } else {
      jsx =
      <ol>
        {complete.map(({ _id, flower, quantity, totalPrice }) => (
          <div className='history' key={_id}>
            <li id={_id}>Order # {_id}</li>
            {flower.map(({ index, id, name, price }) => (
              <p key={_id}><strong>Flower:</strong> <span className='name'>{name}</span> - ${price}ea.</p>
            ))}
            <p>Quantity: {quantity}</p>
            <p>Total Price ${totalPrice}</p>
          </div>
        ))}
      </ol>
    }
    return (
      <div className='container'>
        <h1 className='orderHistory'>Order History</h1>
        {jsx}
      </div>
    )
  }
}
export default OrderHistory
