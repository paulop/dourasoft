<template>
 <ProdInput/>
 <ProdTab/>
 
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { useQuasar } from 'quasar'
    import { ref } from 'vue'

    import ProdInput from 'src/components/ProdInput.vue'
    import ProdTab from 'src/components/ProdTab.vue'
  
  
export default defineComponent({

    name:'Products',
    
    components: {
    ProdInput,
    ProdTab
  }, 

})

</script>
  