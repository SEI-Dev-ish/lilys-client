import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from './apiConfig'
import messages from './components/AutoDismissAlert/messages'
// import flowers from './data/flowers'

class Flower extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isInOrder: false,
      quantity: 1
    }
  }

  handleSubmit = (event) => {
    const { msgAlert } = this.props
    console.log(this.props.name, this.props.price)
    console.log(this.props.user.token)
    console.log('quantity', this.state.quantity)
    // const flower = this.props.name + this.props.price
    axios({
      url: `${apiUrl}/order`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        order: {
          isComplete: false,
          totalPrice: this.props.price,
          quantity: this.state.quantity,
          flower: [ {
            name: this.props.name,
            price: this.props.price,
            orderQuantity: this.props.orderQuantity
          }
          ]
        },
        owner: this.props.user

      }
    })
      .then((response) => this.setState({ isInOrder: true }))
      .then(() => msgAlert({
        heading: 'Item Added',
        message: messages.addedToOrder,
        variant: 'success'
      }))
      .catch(console.error)
  }

  render () {
    let jsx
    if (this.props.user !== null) {
      jsx =
      <div>
        <Card border='primary' style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.image} />
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Title>${this.props.price}</Card.Title>
            <Card.Text>
              {this.props.description}
            </Card.Text>
            <Button onClick={this.handleSubmit} variant="primary">Add to cart</Button>
          </Card.Body>
        </Card>
      </div>
    } if (this.props.user === null) {
      jsx =
      <div>
        <Card border='primary' style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.image}/>
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Title>${this.props.price}</Card.Title>
            <Card.Text>
              {this.props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    }
    return (
      <div>
        {jsx}
      </div>
    )
  }
}

export default Flower
