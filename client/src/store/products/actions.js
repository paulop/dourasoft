import axios from 'axios'
import { printError } from 'src/store'

export function addProduct ({ commit }, product) {
  return axios.post('/api/products', product)
    .then(({ status, data }) => status === 201 && commit('updateProductList', {
      product: data,
      id: data.id
    }))
    .catch(printError)
}

export function deleteProduct ({ commit }, id) {
  return axios.delete(`/api/products/${id}`)
    .then(({ status }) => (status === 200 || status === 404) && commit('deleteProduct', id))
    .catch(printError)
}

export function updateProduct ({ commit }, { id, product }) {
  return axios.patch(`/api/products/${id}`, product)
    .then(({ status, data }) => status < 300 && status >= 200 && commit('updateProductList', {
      product: data,
      id: id
    }))
    .catch(printError)
}

export function getAllProducts ({ commit }) {
  return axios.get('http://localhost:8765/api/products')
    .then(({ data }) => commit('setProducts', data))
    .catch(printError)
}
