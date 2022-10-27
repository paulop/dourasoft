<template>
    <CustomerInput/>
    <CustomerTab/>
    
   </template>
     
   <script>
       import { defineComponent } from 'vue'
       import { useQuasar } from 'quasar'
       import { ref } from 'vue'
   
       import CustomerInput from 'src/components/CustomerInput.vue'
       import CustomerTab from 'src/components/CustomerTab.vue'
     
     
   export default defineComponent({
   
       name:'Customers',
       
       components: {
       CustomerInput,
       CustomerTab
     }, 
   
   })
   
   </script>
     