<template>
    <div class="row">
            <h6 class="q-ma-lg">Inserir Pedido</h6>
    </div>
    
    <div class="q-ma-none flex justify-evenly" style="max-width: 1400px">
        
        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="row q-gutter-xs"

        >
        <q-input
          filled
          dense
          type="number"
          v-model.number="customer_id"
          label="Código Cliente"
          lazy-rules
          :rules="[ val => val && true || 'Insira dados']"
        />
        <q-input
          filled
          dense
          v-model="date"
          label="Data"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Insira dados']"
        />
  
        <div>
          <q-btn  label="Adicionar" type="submit" color="primary" size="12px"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" size="12px" />
        </div>
      </q-form>
  
    </div>
</template>
  
<script>
    import { useQuasar } from 'quasar'
    import { ref } from 'vue'
    import {api} from 'boot/axios'

      
    const getData = async (customer_id, date) => {

        try {
            const body = {customer_id, date};
            //console.log(typeof(body));
            //console.log(body)
            
            //const options = {
            //    method: 'POST',
            //    headers: {'Content-Type': 'application/json'},
            //    body: JSON.stringify(body)
            //};

            //const response = await fetch('http://localhost:3001/orders/api/v1/ord', options

            const {data} = await api.post('http://localhost:3001/orders/api/v1/ord', body)

            //await saveFile(response)

            //await loadFile(response)

            await console.log(data) 

            //window.localStorage.setItem("response", JSON.stringify(response));

            //console.log(JSON.parse(window.localStorage.getItem(response)))

            //console.log(response);        

            //Fast solution for table refresh - Will be switched for Vuex soon
            window.location.reload();


        } catch (error) {
            console.log(error.message);
        }

    }
  
    export default {
        setup () {
            const $q = useQuasar()
            //const sharedData = ref(sharedData)
        
            const customer_id = ref(null)
            const date = ref(null)
            const status = ref(null)
        
            return {
                customer_id,
                date,
        
                onSubmit () {
                    getData(customer_id.value, date.value)
                    
                },
        
                onReset () {
                customer_id.value = null
                date.value = null
                }
            }
        }
    }
  </script>
  