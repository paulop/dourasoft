<template>
  <div>
    <q-card bordered @mouseenter="mouseEnter(id)" flat class="client-card">
      <q-card-section>
        <q-input outlined v-model="name" label="Nome" :error="Boolean(this.nameError)" :error-message="this.nameError"/>
        <q-input outlined v-model="address" label="Endereço" :error="Boolean(this.addressError)"
                 :error-message="this.addressError"/>
        <q-input outlined v-model="tel" label="Telefone"/>
      </q-card-section>
      <q-card-actions class="client-actions" align="between" :style="hideActions ? hideActionsStyle : showActionStyle">
        <q-btn outline round v-if="!updateMode" :icon="matDone" @click="addClient"/>
        <q-btn outline round v-if="updateMode" :icon="matEdit" @click="updateClient"/>
        <q-btn outline round :icon="matRemove" @click="deleteClient"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { matDone, matRemove, matEdit } from '@quasar/extras/material-icons'

export default {
  name: 'ClientCard',
  props: ['clientName', 'clientAddress', 'clientTel', 'finisher', 'updateMode', 'id', 'hideActions', 'mouseEnter'],
  created () {
    this.matDone = matDone
    this.matRemove = matRemove
    this.matEdit = matEdit
  },
  data () {
    const { clientName, clientAddress, clientTel } = this.$props
    return {
      name: clientName || '',
      address: clientAddress || '',
      tel: clientTel || '',
      nameError: '',
      addressError: '',
      showActionStyle: 'opacity: 1; padding: 16px;',
      hideActionsStyle: 'opacity: 0; padding: 16px;'
    }
  },
  methods: {
    addClient () {
      if (!this.validate()) {
        return
      }
      this.$store.dispatch('clientsStore/addClient', {
        name: this.name,
        address: this.address,
        tel: this.tel
      })
      if (this.finisher) {
        this.finisher()
      }
    },
    deleteClient () {
      if (!this.id && this.id !== 0) {
        if (this.finisher) {
          this.finisher()
        }
        return
      }
      this.$store.dispatch('clientsStore/deleteClient', this.id)
    },
    updateClient () {
      if ((!this.id && this.id !== 0) || !this.validate()) {
        return
      }
      this.$store.dispatch('clientsStore/updateClient', {
        id: this.id,
        client: {
          name: this.name,
          address: this.address,
          tel: this.tel
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
      if (!this.address.trim()) {
        isValid = false
        this.addressError = 'Endereço Inválido'
      } else {
        this.addressError = ''
      }
      return isValid
    }
  }
}
</script>

<style lang="scss" scoped>
.client-card {
  max-width: 300px;

  & > * > * {
    margin: 10px;
  }

  &:hover .client-actions{
    opacity: 1!important;
  }

}
</style>
