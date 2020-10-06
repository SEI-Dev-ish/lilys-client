import React, { Component } from 'react'
// import flowers from './data/flowers'

class Flower extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userSignedIn: false,
      isInOrder: false
    }
  }
  render () {
    return (
      <div>
        <h3>Name: {this.props.name}</h3>
        <p>Price: {this.props.price}</p>
      </div>
    )
  }
}

export default Flower
