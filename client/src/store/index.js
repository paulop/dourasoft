import Vue from 'vue'
import Vuex from 'vuex'
import clientsStore from './clients'
import productsStore from './products'
import ordersStore from './orders'

Vue.use(Vuex)

export default function () {
  return new Vuex.Store({
    modules: {
      clientsStore,
      productsStore,
      ordersStore
    },
    strict: process.env.DEBUGGING
  })
}

export function printError ({ response }) {
  if (response) {
    console.log(response.header)
    console.log(response.data)
    console.log(response.status)
  }
}
