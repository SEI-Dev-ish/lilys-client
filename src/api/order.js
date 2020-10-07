import apiUrl from '../apiConfig'
import axios from 'axios'

export const createOrder = (order) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/order',
    data: order
  })
}

export const showOrder = (user) => {
  return axios({
    url: apiUrl + '/orders',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}

export const updateOrder = (data, orderId, user) => {
  return axios({
    url: apiUrl + '/order/' + `${orderId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: data
  })
}

export const delteOrder = (passwords, user) => {
  return axios({
    url: apiUrl + '/order',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {}
  })
}
