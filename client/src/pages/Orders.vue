<template>
    <OrdInput/>
    <OrdTab/>
    
   </template>
     
   <script>
       import { defineComponent } from 'vue'
       import { useQuasar } from 'quasar'
       import { ref } from 'vue'
   
       import OrdInput from 'src/components/OrdInput.vue'
       import OrdTab from 'src/components/OrdTab.vue'
     
     
   export default defineComponent({
   
       name:'Orders',
       
       components: {
       OrdInput,
       OrdTab
     }, 
   
   })
   
   </script>
     