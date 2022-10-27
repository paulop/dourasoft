<template>
    <div class="row">
            <h6 class="q-ma-lg">Inserir Produto</h6>
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
          v-model.number="cod_prod"
          label="Código"
          lazy-rules
          :rules="[ val => val && true || 'Insira dados']"
        />
        <q-input
          filled
          dense
          v-model="prod_name"
          label="Produto"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Insira dados']"
        />
  
        <q-input
          filled
          dense
          v-model="description"
          label="Descrição"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Insira dados']"
        />

        <q-input
          filled
          dense
          type="number"
          step="any"
          v-model.number="price"
          label="Preço"
          lazy-rules
          :rules="[ val => val && true || 'Insira dados']"
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

      
    const getData = async (cod_prod, prod_name, description, price) => {

        try {
            const body = {cod_prod, prod_name, description, price};

            const {data} = await api.post('http://localhost:3001/api/v1/register', body)


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
        
            const cod_prod = ref(null)
            const prod_name = ref(null)
            const description = ref(null)
            const price = ref(null)
        
            return {
                cod_prod,
                prod_name,
                description,
                price,
        
                onSubmit () {
                    getData(cod_prod.value, prod_name.value, description.value, price.value)
                    
                },
        
                onReset () {
                cod_prod.value = null
                prod_name.value = null
                description.value = null
                price.value = null
                }
            }
        }
    }
  </script>
  