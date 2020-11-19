<template>
  <div>
    <q-card bordered flat class="client-card" @mouseenter="mouseEnter(id)">
      <q-card-section>
        <q-input outlined
                 v-model="name"
                 :error="Boolean(nameError)"
                 :error-message="nameError"
                 label="Nome"/>
        <q-input outlined
                 v-model="code"
                 :error="Boolean(codeError)"
                 :error-message="codeError"
                 label="Código"/>
        <q-input outlined
                 v-model="price"
                 label="Preço"
                 type="number"
                 :error="Boolean(priceError)"
                 :error-message="priceError"
                 prefix="R$"/>
        <q-input outlined
                 v-model="description"
                 type="textarea"
                 label="Descrição"/>
      </q-card-section>
      <q-card-actions align="between" :style="hideActions ? hideActionsStyle : showActionStyle" class="card-actions">
        <q-btn outline round
               v-if="!updateMode"
               :icon="matDone"
               @click="addProduct"/>
        <q-btn outline
               round
               v-if="updateMode"
               :icon="matEdit"
               @click="updateProduct"/>
        <q-btn outline
               round
               :icon="matRemove"
               @click="deleteProduct"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { matDone, matRemove, matEdit } from '@quasar/extras/material-icons'

export default {
  name: 'ProductCard',
  props: ['productName', 'productCode', 'productDescription', 'productPrice', 'updateMode', 'id', 'finisher', 'mouseEnter', 'hideActions'],
  created () {
    this.matDone = matDone
    this.matRemove = matRemove
    this.matEdit = matEdit
  },
  data () {
    const { productName, productDescription, productCode, productPrice } = this.$props
    return {
      name: productName || '',
      description: productDescription || '',
      code: productCode || '',
      price: parseFloat(productPrice) >= 0 ? productPrice : '',
      nameError: '',
      codeError: '',
      priceError: '',
      showActionStyle: 'opacity: 1; padding: 16px;',
      hideActionsStyle: 'opacity: 0; padding: 16px;'
    }
  },
  methods: {

    addProduct () {
      if (!this.validate()) {
        return
      }
      this.$store.dispatch('productsStore/addProduct', {
        name: this.name,
        code: this.code,
        price: this.price,
        description: this.description
      })
      if (this.finisher) {
        this.finisher()
      }
    },

    deleteProduct () {
      if (!this.id && this.id !== 0) {
        if (this.finisher) {
          this.finisher()
        }
        return
      }
      this.$store.dispatch('productsStore/deleteProduct', this.id)
    },
    updateProduct () {
      if ((!this.id && this.id !== 0) || !this.validate()) {
        return
      }
      this.$store.dispatch('productsStore/updateProduct', {
        id: this.id,
        product: {
          name: this.name,
          code: this.code,
          price: this.price,
          description: this.description
        }
      })
    },

    validate () {
      let isValid = true
      if (!this.name.trim()) {
        isValid = false
        this.nameError = 'Nome Inválido'
      } else {
        this.nameError = ''
      }
      if (!this.code.trim()) {
        isValid = false
        this.codeError = 'Código Inválido'
      } else {
        this.codeError = ''
      }
      if (parseFloat(this.price) >= 0) {
        this.priceError = ''
      } else {
        isValid = false
        this.priceError = 'Preço Inválido'
      }
      return isValid
    }
  }
}
</script>

<style lang="scss" scoped>
.client-card {
  max-width: 300px;

  &:hover .card-actions {
    opacity: 1 !important;
  }

  & > * > * {
    margin: 10px;
  }

}
</style>
