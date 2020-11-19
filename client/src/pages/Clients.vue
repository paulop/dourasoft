<template>
  <div class="page-body">
    <q-btn style="margin: 15px 0 0 15px" v-if="!addMode" round :icon="matPersonAdd"  @click="changeMode"/>
    <div class="card-list">
      <ClientCard v-if="addMode" :finisher="changeMode" :mouseEnter="setSelectedId"
                  :hide-actions="hoverId !== null" :id="null"/>
      <ClientCard v-for="client in clients" :key="client.id" :mouseEnter="setSelectedId"
                  :hide-actions="hoverId !== client.id" update-mode="true" :id="client.id" :client-name="client.name"
                  :client-address="client.address"
                  :client-tel="client.tel"/>
    </div>
  </div>
</template>

<script>
import ClientCard from 'components/ClientCard'
import { matPersonAdd } from '@quasar/extras/material-icons'

export default {
  name: 'ClientsPage',
  components: { ClientCard },
  computed: {
    clients: {
      get () {
        return this.$store.state.clientsStore.clients
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
    this.matPersonAdd = matPersonAdd
  },
  preFetch ({ store }) {
    return store.dispatch('clientsStore/getAllClients')
  }
}
</script>

<style scoped>

</style>
