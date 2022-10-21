<template>
    <div class="q-pa-md">
        <q-table
        title="Listagem de Produtos"
        :rows="rows"
        :columns="columns"
        row-key="detail"
      >
      
      <template v-slot:body-cell-edit="props">
          <q-td :props="props">
            <q-btn @click="fixed=true" dense round color="secondary" icon="edit"/>
          </q-td>
      </template>

      <template v-slot:body-cell-delete="props">
        <q-td :props="props">
          <div class="q-gutter-sm flex flex-center">
          <q-btn dense color="red"  icon="delete"/>
          </div>
        </q-td>
      </template>

      
      </q-table>

      <q-dialog v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
      </q-dialog>

    </div>
</template>
  
<script>
  import { useQuasar } from 'quasar'
  import {ref} from 'vue'


  const fetchData =  async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/regs');
        const data = await response.json();
        //console.log(data.rows);
        return(data.rows)

      } catch (error) {
        console.log(error.message)
        }
    }
    const data = await fetchData();

  const columns = [

    { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
    { name: 'cod_prod', align: "left", label: 'Código Produto', field: 'cod_prod', sortable: true },
    { name: 'name', align: "left", label: 'Nome', field: 'prod_name' },
    { name: 'description', align: "left", label: 'Descrição', field: 'description' },
    { name: 'price', align: "left", label: 'Preço', field: 'price', sortable: true },
    { name: 'edit', align: "left", label: 'Editar', field: 'edit', sortable: true },
    { name: 'delete', align: "delete", label: 'Deletar', field: 'delete', sortable: true }

  ]

  const rows = data;
    
  
  export default {
    setup () {
    const $q = useQuasar()

    const cod_prod = ref(null)
    const name = ref(null)
    const description = ref(null)
    const price = ref(false)    

    return {
      columns,
      rows,
      fixed: ref(false),


      onSubmit () {
        if (cod_prod.value && name.value && description.value && price.value ) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      
      onReset () {
        cod_prod.value = null
        name.value = null
        description.value = null
        price.value = null
      }
    }
    
    }
  }

  
</script>
  