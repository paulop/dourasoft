<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Desafio DouraSoft
        </q-toolbar-title>
        <div class="page-sections">
          <a href="/clients">Clientes</a>
          <a href="/products">Produtos</a>
          <a href="/orders">Pedidos</a>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
<style scoped lang="scss">
.page-sections {
  display: flex;
  align-items: center;
  height: 50px;
  > a {
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 12px;
    color: white;
    &:hover {
      background-color: #26A69A;
      color: black;
    }
  }
}
</style>
