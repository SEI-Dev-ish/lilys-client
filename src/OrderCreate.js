// import React because we're using React.
import React from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router-dom'

class OrderCreate extends React.Component {
  constructor (props) {
    super(props) // initialize movie state
    this.state = {
      order: {
        isComplete: '',
        totalPrice: '',
        owner: ''
      },
      createdOrderId: ''
    }
  }

  handleChange = (event) => {
    const userInput = event.target.value
    const bookKey = event.target.name
    const bookCopy = Object.assign({}, this.state.book)
    bookCopy[bookKey] = userInput
    this.setState({ book: bookCopy })
  }

  handleAddToCart = (event) => {
    event.preventDefault()
    const order = this.state.order
    axios.post(apiUrl + '/order', { order }) // ajax call
      .then(response => {
        console.log('order response: ', response)
        this.setState({ createdOrderId: response.data.order._id })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.createdBookId !== '') {
      return <Redirect to='/' />
    }
    // return (
    //   <div>
    //     <h2>Create Book Page</h2>
    //     <form onSubmit={this.handleSubmit}>
    //       <input name='title' type='text' value={this.state.book.title} onChange={this.handleChange} />
    //       <input name='author' type='text' value={this.state.book.author} onChange={this.handleChange} />
    //       <input type='submit' value='Submit' />
    //     </form>
    //   </div>
    // )
  }
}
export default OrderCreate
