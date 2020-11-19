<template>
  <div class="page-body">
    <q-btn style="margin: 15px 0 0 15px" v-if="!addMode" round :icon="matOrderAdd" @click="changeMode"/>
    <div class="card-list">
      <OrderCard v-if="addMode"
                 :finisher="changeMode"
                 :id="null" :mouseEnter="setSelectedId"
                 :update-mode="false"
                 :product-options="products"
                 :client-options="clients"
                 :hide-actions="hoverId !== null"/>
      <OrderCard v-for="order in orders"
                 :key="order.id"
                 :id="order.id"
                 :update-mode="true"
                 :mouseEnter="setSelectedId"
                 :hide-actions="hoverId !== order.id"
                 :order-client="order.client"
                 :order-products="order.products"
                 :order-date="order.created_at"
                 :order-status="order.status"
                 :order-total="order.total"
                 :product-options="products"
                 :client-options="clients"/>
    </div>
  </div>
</template>

<script>
import OrderCard from 'components/OrderCard'
import { matAddShoppingCart } from '@quasar/extras/material-icons'

export default {
  name: 'OrdersPage',
  components: { OrderCard },
  computed: {
    clients: {
      get () {
        return this.$store.state.clientsStore.clients
      }
    },
    products: {
      get () {
        return this.$store.state.productsStore.products
      }
    },
    orders: {
      get () {
        return this.$store.state.ordersStore.orders
      }
    }
  },
  data () {
    return {
      addMode: false,
      hoverId: null
    }
  },
  methods: {
    changeMode () {
      this.addMode = !this.addMode
    },
    setSelectedId (id) {
      this.hoverId = id
    }
  },
  created () {
    this.matOrderAdd = matAddShoppingCart
  },
  preFetch ({ store }) {
    return Promise.all([
      store.dispatch('ordersStore/getAllOrders'),
      store.dispatch('clientsStore/getAllClients'),
      store.dispatch('productsStore/getAllProducts')
    ])
  }
}
</script>

<style scoped>

</style>
