<template>
    <div class="row">
            <h6 class="q-ma-lg">Inserir Cliente</h6>
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
          v-model="customer_name"
          label="Nome Cliente"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Insira dados']"
        />
        <q-input
          filled
          dense
          v-model="phone"
          label="Fone 11-dígitos"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Insira dados']"
        />
  
        <q-input
          filled
          dense
          v-model="addr"
          label="Endereço"
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

     
    const getData = async (customer_name, phone, addr) => {

        try {
            const body = {customer_name, phone, addr};
            //console.log(typeof(body));
            //console.log(body)
            
            //const options = {
            //    method: 'POST',
            //    headers: {'Content-Type': 'application/json'},
            //    body: JSON.stringify(body)
            //};

            //const response = await fetch('http://localhost:3001/customers/api/v1/cust', options

            const {data} = await api.post('http://localhost:3001/customers/api/v1/cust', body)

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
        
            const customer_name = ref(null)
            const phone = ref(null)
            const addr = ref(null)
        
            return {
                customer_name,
                phone,
                addr,
        
                onSubmit () {
                    getData(customer_name.value, phone.value, addr.value)
                    
                },
        
                onReset () {
                customer_name.value = null
                phone.value = null
                addr.value = null
                }
            }
        }
    }
  </script>
  