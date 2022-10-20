<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-8">
        <TabsMenu/>

        <div>Made using Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import TabsMenu from 'src/components/TabsMenu.vue'


export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    TabsMenu
  },

  setup () {
    
  }
})
</script>
