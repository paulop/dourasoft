<template>
  <div class="page-body">
    <q-btn style="margin: 15px 0 0 15px" v-if="!addMode" round :icon="matProductAdd" @click="changeMode"/>
    <div class="card-list">
      <ProductCard v-if="addMode" :finisher="changeMode" :mouseEnter="setSelectedId"
                   :hide-actions="hoverId !== null" :id="null"/>
      <ProductCard v-for="product in products" :update-mode="true" :key="product.id" :id="product.id"
                   :product-name="product.name" :product-code="product.code" :mouseEnter="setSelectedId"
                   :hide-actions="hoverId !== product.id"
                   :product-description="product.description" :product-price="product.price"/>
    </div>
  </div>
</template>

<script>
import ProductCard from 'components/ProductCard'
import { matEnhancedEncryption } from '@quasar/extras/material-icons'

export default {
  name: 'ProductsPage',
  components: { ProductCard },
  computed: {
    products: {
      get () {
        return this.$store.state.productsStore.products
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
    this.matProductAdd = matEnhancedEncryption
  },
  preFetch ({ store }) {
    return store.dispatch('productsStore/getAllProducts')
  }
}
</script>

<style scoped>

</style>
