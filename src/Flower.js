import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import flowers from './data/flowers'

class Flower extends Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = {
      isInOrder: false
    }
  }
  render () {
    console.log(this.state)
    let jsx
    if (this.props.user !== null) {
      jsx = <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="../public/Lily-images/acapulco-oriental.jpg" />
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
              {this.props.description}
                Price: {this.props.price}
            </Card.Text>
            <Button onSubmit={this.handleSubmit} variant="primary">Add to cart</Button>
          </Card.Body>
        </Card>
      </div>
    } if (this.props.user === null) {
      jsx = <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="../public/Lily-images/acapulco-oriental.jpg" />
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
              {this.props.description}
              Price: {this.props.price}
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
