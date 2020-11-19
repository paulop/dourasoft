import axios from 'axios'
import { printError } from 'src/store'

export function addOrder ({ commit }, order) {
  return axios.post('/api/orders', order)
    .then(({ status, data }) => status === 201 && commit('updateOrderList', {
      order: data,
      id: data.id
    }))
    .catch(printError)
}

export function deleteOrder ({ commit }, id) {
  return axios.delete(`/api/orders/${id}`)
    .then(({ status }) => (status === 200 || status === 404) && commit('deleteOrder', id))
    .catch(printError)
}

export function updateOrder ({ commit }, { id, order }) {
  return axios.patch(`/api/orders/${id}`, order)
    .then(({ status, data }) => status < 300 && status >= 200 && commit('updateOrderList', {
      order: data,
      id: id
    }))
    .catch(printError)
}

export function getAllOrders ({ commit }) {
  return axios.get('http://localhost:8765/api/orders')
    .then(({ data }) => commit('setOrders', data))
    .catch(printError)
}

export function loadOrder ({ commit }, id) {
  return axios.get(`/api/orders/${id}`)
    .then(({ status, data }) => {
      if (status < 300 && status >= 200 && data) {
        commit('updateOrderList', {
          order: data,
          id: id
        })
        return data.products
      }
    })
    .catch(printError)
}
