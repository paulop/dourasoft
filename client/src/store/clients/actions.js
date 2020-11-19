import axios from 'axios'
import { printError } from 'src/store'

export function addClient ({ commit }, client) {
  return axios.post('/api/clients', client)
    .then(({ status, data }) => {
      if (status === 201) {
        commit('updateClientList', {
          client: data,
          id: data.id
        })
        return data
      }
    })
    .catch(printError)
}

export function deleteClient ({ commit }, id) {
  return axios.delete(`/api/clients/${id}`)
    .then(({ status }) => (status === 200 || status === 404) && commit('deleteClient', id))
    .catch(printError)
}

export function updateClient ({ commit }, { id, client }) {
  return axios.patch(`/api/clients/${id}`, client)
    .then(({ status, data }) => status < 300 && status >= 200 && commit('updateClientList', {
      client: data,
      id: id
    }))
    .catch(printError)
}

export function getAllClients ({ commit }) {
  return axios.get('http://localhost:8765/api/clients')
    .then(({ data }) => commit('setClients', data))
    .catch(printError)
}
