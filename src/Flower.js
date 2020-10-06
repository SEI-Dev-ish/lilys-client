import React, { Component } from 'react'
import flowers from './data/flowers'

class Flower extends Component {
  constructor () {
    super()
    this.state = {
      userSignedIn: false,
      isInOrder: false
    }
  }
  render () {
    return (
      <div>
        {flowers.map(flower => (
          <Flower
            id={flower.id}
            key={flower.name}
            name={flower.name}
            price={flower.price}
          />
        ))}
      </div>
    )
  }
}

export default Flower
