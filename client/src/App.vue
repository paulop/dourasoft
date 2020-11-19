<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.page-body{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
}
.card-list{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  padding: 15px;
  flex-wrap: wrap;
  > *{
    margin: 7px;
  }
}
</style>
