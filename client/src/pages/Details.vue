<template>
    <DetailsTab/>
    
</template>
     
<script>
    import { defineComponent } from 'vue'
    import { useQuasar } from 'quasar'
    import { ref } from 'vue'
    import DetailsTab from 'src/components/DetailsTab.vue'
   
     
export default defineComponent({
   
    name:'Details',
       
    components: {
        DetailsTab

     }, 
   
})
   
</script>
     