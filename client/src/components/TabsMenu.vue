<template>
  <div class="q-pa-md bg-grey-8">
    <q-toolbar class="q-pa-sm  text-white shadow-2 rounded-borders">
      <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar>
      <q-btn flat label="CRUD- PostgreSQL" />
      <q-space />

      <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
      <q-tabs v-model="tab" shrink>
        <q-tab name="tab1" label="Produtos" />
        <q-tab name="tab2" label="Clientes" />
        <q-tab name="tab3" label="Pedidos" />
      </q-tabs>
    </q-toolbar>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      tab: ref('')
    }
  }
}
</script>