import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import flowers from './../../data/flowers'
import Flower from './../../Flower'
import Order from './../Order/Order'
import OrderHistory from './../Order/OrderHistory'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <Route user={user} exact path='/' render={() => (
            <div>
              <h2>Flowers</h2>
              {flowers.map(flower => (
                <Flower
                  user={user}
                  key={flower.name}
                  id={flower.id}
                  name={flower.name}
                  description={flower.description}
                  image={flower.image}
                  price={flower.price}
                  orderQuantity={flower.orderQuantity}
                  msgAlert={this.msgAlert}
                />
              ))}
            </div>
          )}/>
          <Route exact path='/order' render={() => (
            <Order
              user={user}
              msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/order-history' render={() => (
            <OrderHistory user={user} />
          )} />
          <Route exact path='/success' />
          <Route exact path='/cancel' />
          <Route exact path='/create-checkout-session' />
        </main>
      </Fragment>
    )
  }
}

export default App
