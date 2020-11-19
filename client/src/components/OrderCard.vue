<template>
  <div>
    <q-card @mouseenter="mouseEnter(id)" class="client-card" flat bordered>
      <q-card-section>
        <div class="row-items">
          <q-select style="width: 150px" outlined v-model="status" label="Status"
                    :options="['Cancelado', 'Entregue', 'Aberto']"/>
          <q-input outlined v-model="date" label="Data" disable/>
          <q-input style="width: 100px" outlined v-model="total" label="Total" type="number" prefix="R$" disable/>
        </div>
      </q-card-section>
      <q-card-section style="padding-bottom: 0">
        <div class="row-items">
          <q-select v-show="!addClientMode"
                    outlined
                    style="width: 100%"
                    v-model="client"
                    :options="clientOptions"
                    option-value="id"
                    option-label="name"
                    :error="Boolean(selectedClientError)"
                    :error-message="selectedClientError"
                    label="Cliente"/>
          <q-input v-show="addClientMode"
                   style="width: 100%; margin-left: 0"
                   outlined
                   v-model='createClient.name'
                   :error="Boolean(createClientError.name)"
                   :error-message="createClientError.name"
                   label="Cliente"/>
        </div>
      </q-card-section>
      <q-slide-transition>
        <div v-show="expanded">
          <q-card-section>
            <q-input v-show="!addClientMode"
                     outlined
                     v-model="client.address"
                     :error="false"
                     :error-message="createClientError.address"
                     disable
                     label="Endereço"/>
            <q-input v-show="addClientMode"
                     outlined
                     v-model="createClient.address"
                     :error="Boolean(createClientError.address)"
                     :error-message="createClientError.address"
                     label="Endereço"/>
            <q-input v-show="!addClientMode"
                     style="margin: 16px 0 0 0"
                     outlined
                     disable
                     v-model="client.tel"
                     label="Telefone"/>
            <q-input v-show="addClientMode"
                     style="margin: 16px 0 0 0"
                     outlined
                     v-model="createClient.tel"
                     label="Telefone"/>
          </q-card-section>
          <q-card-section>
            <div style="padding: 8px 0" class="row-items">
              <q-select outlined
                        v-model="productModel"
                        :options="productOptions"
                        option-value="id"
                        option-label="name"
                        style="width: 50%"
                        :error="Boolean(productError.name)"
                        :error-message="productError.name"
                        label="Produto"/>
              <q-input outlined
                       v-model="product.quantity"
                       label="Quantidade"
                       style="width: 28%"
                       :error="Boolean(productError.quantity)"
                       :error-message="productError.quantity"
                       type="number"/>
              <q-input outlined
                       v-model="product.unit_value"
                       label="Preço"
                       type="number"
                       style="width: 22%"
                       :error="Boolean(productError.unit_value)"
                       :error-message="productError.unit_value"
                       prefix="R$"/>
              <q-btn style="height: 42px; width: 42px; margin-bottom: 20px;"
                     outline
                     round
                     :icon="matAddProduct"
                     @click="addProduct"/>
            </div>
            <div style="padding: 8px 0" v-for="productItem in products" :key="productItem.id" class="row-items">
              <q-input outlined
                       :value="productItem.product ? productItem.product.name : ''"
                       label="Produto"
                       disable
                       style="width: 50%"/>
              <q-input outlined
                       :value="productItem.quantity"
                       label="Quantidade"
                       type="number"
                       disable
                       style="width: 28%"/>
              <q-input outlined
                       :value="productItem.unit_value"
                       label="Preço"
                       type="number"
                       prefix="R$"
                       disable
                       style="width: 22%"/>
              <q-btn style="height: 42px; width: 42px"
                     @click="deleteProduct(productItem.id)"
                     outline
                     round
                     :icon="matRemove"/>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
      <q-card-actions :style="hideActions ? hideActionsStyle : showActionStyle" class="card-actions"
                      align="between">
        <q-btn v-if="this.id === null" outline round @click="addOrder" :icon="matDone"/>
        <q-btn v-else outline round @click="updateOrder" :icon="matEdit"/>
        <q-btn outline round :icon="matRemove" @click="deleteOrder"/>
        <q-btn outline round :icon="addClientMode ? matClient : matAddClient" @click="setAddClientMode"/>
        <q-btn class="expand-button"
               outline
               round
               :icon="expanded ? matExpandLess:matExpandMore"
               @click="loadOrder"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {
  matDone,
  matExpandMore,
  matExpandLess,
  matEdit,
  matRemove,
  matEnhancedEncryption,
  matPersonAdd,
  matPerson
} from '@quasar/extras/material-icons'

export default {
  name: 'OrderCard',
  created () {
    this.matDone = matDone
    this.matRemove = matRemove
    this.matExpandMore = matExpandMore
    this.matExpandLess = matExpandLess
    this.matEdit = matEdit
    this.matAddProduct = matEnhancedEncryption
    this.matAddClient = matPersonAdd
    this.matClient = matPerson
  },
  props: ['orderClient', 'productOptions', 'clientOptions', 'orderProducts', 'orderStatus', 'orderDate', 'id', 'orderTotal', 'hideActions', 'mouseEnter', 'updateMode', 'finisher'],
  methods: {
    loadOrder () {
      if (this.id !== null && !this.expanded) {
        this.$store.dispatch('ordersStore/loadOrder', this.id).then((products) => {
          this.expanded = true
          this.products = [...products] || this.products
          this.isOrderProductsLoaded = true
        })
      } else {
        this.expanded = !this.expanded
      }
    },
    addOrder () {
      if (this.validate()) {
        if (this.addClientMode) {
          this.$store.dispatch('clientsStore/addClient', {
            name: this.createClient.name,
            address: this.createClient.address,
            tel: this.createClient.tel
          }).then((client) => client && client.id && this.$store.dispatch('ordersStore/addOrder', {
            client_id: client.id,
            status: this.status,
            products: this.products
          }).then(() => this.finisher && this.finisher()))
        } else {
          this.$store.dispatch('ordersStore/addOrder', {
            client_id: this.client.id,
            status: this.status,
            products: this.products
          }).then(() => this.finisher && this.finisher())
        }
      }
    },
    updateOrder () {
      if (this.validate() && this.id !== null) {
        if (this.addClientMode) {
          this.$store.dispatch('clientsStore/addClient', {
            name: this.createClient.name,
            address: this.createClient.address,
            tel: this.createClient.tel
          }).then((client) => {
            if (client && client.id) {
              const order = {
                client_id: client.id,
                status: this.status
              }
              if (this.products.length > 0 || this.isOrderProductsLoaded) {
                order.products = this.products
              }
              this.$store.dispatch('ordersStore/updateOrder', {
                order,
                id: this.id
              })
            }
          })
        } else {
          const order = {
            client_id: this.client.id,
            status: this.status
          }
          if (this.products.length > 0 || this.isOrderProductsLoaded) {
            order.products = this.products
          }
          this.$store.dispatch('ordersStore/updateOrder', {
            order,
            id: this.id
          })
        }
      }
    },
    deleteOrder () {
      if (this.id || this.id === 0) {
        this.$store.dispatch('ordersStore/deleteOrder', this.id)
      }
      if (this.finisher) {
        this.finisher()
      }
    },
    addProduct () {
      if (this.validateProduct()) {
        this.products.splice(0, 0, {
          product: {
            name: this.product.name
          },
          quantity: this.product.quantity || '0',
          unit_value: this.product.unit_value || '0',
          product_id: this.product.id,
          id: this.products.length && (this.products[0].id - 1)
        })
        this.product.name = ''
        this.product.quantity = ''
        this.product.unit_value = ''
        this.product.id = null
      }
    },
    deleteProduct (id) {
      const index = this.products.findIndex(product => product.id === id)
      this.products.splice(index, 1)
    },
    validateProduct () {
      let isValid = true
      if (this.product.name.trim()) {
        this.productError.name = ''
      } else {
        this.productError.name = 'Selecione um Produto'
        isValid = false
      }
      if (this.product.quantity >= 0) {
        this.productError.quantity = ''
      } else {
        this.productError.quantity = 'Quantidade Inválida'
        isValid = false
      }
      if (this.product.unit_value >= 0) {
        this.productError.unit_value = ''
      } else {
        this.productError.unit_value = 'Valor Inválido'
        isValid = false
      }
      return isValid
    },
    validate () {
      let isValid = true
      if (this.addClientMode) {
        if (this.createClient.name.trim()) {
          this.createClientError.name = ''
        } else {
          isValid = false
          this.createClientError.name = 'Nome Inválido'
        }
        if (this.createClient.address.trim()) {
          this.createClientError.address = ''
        } else {
          isValid = false
          this.createClientError.address = 'Endereço Inválido'
        }
      } else if (!this.client || !this.client.name || (this.client.id !== 0 && !this.client.id)) {
        isValid = false
        this.selectedClientError = 'Selecione Um'
      } else {
        this.selectedClientError = ''
      }
      return isValid
    },
    setAddClientMode () {
      this.addClientMode = !this.addClientMode
      if (this.addClientMode) {
        this.expanded = true
      }
    }
  },
  computed: {
    date: {
      get () {
        const date = this.$props.orderDate && new Date(this.$props.orderDate)
        if (date) {
          let day = date.getUTCDate().toString()
          let hours = date.getHours().toString()
          let minutes = date.getMinutes().toString()
          hours = hours.length === 1 ? '0' + hours : hours
          minutes = minutes.length === 1 ? '0' + minutes : minutes
          day = day.length === 1 ? '0' + day : day
          return `${day}/${date.getMonth() + 1}/${date.getFullYear()} - ${hours}:${minutes}`
        } else {
          return ''
        }
      }
    },
    total: {
      get () {
        if (!this.expanded) {
          return this.$props.orderTotal || ''
        } else {
          let total = 0
          for (const product of this.products) {
            total += product.quantity * product.unit_value
          }
          return total
        }
      }
    },
    productModel: {
      get () {
        return this.product
      },
      set (newValue) {
        if (newValue) {
          this.product.id = newValue.id
          this.product.name = newValue.name
          this.product.quantity = 1
          this.product.unit_value = newValue.price
        }
      }
    }
  },
  data () {
    let { orderClient, orderProducts, orderStatus } = this.$props
    orderClient = orderClient || {}
    return {
      expanded: false,
      products: orderProducts || [],
      product: {
        name: '',
        quantity: '',
        unit_value: '',
        id: null
      },
      addClientMode: false,
      client: {
        name: orderClient.name || '',
        address: orderClient.address || '',
        tel: orderClient.tel || '',
        id: orderClient.id || null
      },
      createClient: {
        name: '',
        address: '',
        tel: ''
      },
      selectedClientError: '',
      createClientError: {
        name: '',
        address: ''
      },
      productError: {
        name: '',
        quantity: '',
        unit_value: ''
      },
      status: orderStatus || 'Aberto',
      showActionStyle: 'opacity: 1; padding: 16px;',
      hideActionsStyle: 'opacity: 0; padding: 16px;',
      isOrderProductsLoaded: false
    }
  }
}
</script>

<style lang="scss" scoped>
.client-card {
  max-width: 500px;

  &:hover .card-actions {
    opacity: 1 !important;
  }
}

.row-items {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > * {
    margin: 0 0 0 10px;
  }

  :first-child {
    margin: 0;
  }
}
</style>
