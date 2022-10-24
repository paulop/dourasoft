<template>
    <div class="q-pa-md">
        <q-table
        title="Listagem de Clientes"
        :rows="rows"
        :columns="columns"
        row-key="name"
        >
      
            <template v-slot:body-cell-edit="props">
                <q-td :props="props">
                    <q-btn @click="openmodel(props.row);" dense round color="secondary" icon="edit"/>
                </q-td>
            </template>

            <template v-slot:body-cell-delete="props">
                <q-td :props="props">
                <div class="q-gutter-sm flex flex-center">
                <q-btn dense color="red" @click="handleDelete(rows, props.row.id)" icon="delete"/>
                </div>
                </q-td>
            </template>     
      </q-table>

      <q-dialog v-model="alter">
            <q-card style="max-width: 500px;width:500px;height:470px">
                <q-card-section>
                    <div class="text-h6">Editar cliente</div>
                </q-card-section>

                <q-separator />
          

            <div class="q-ma-md flex justify-evenly " style="height: 320px">
            
                <q-form
                    @submit="onSubmit(id, cnm, ph, addr)"
                    @reset="onReset"
                    
                    class="q-gutter-xs"
                >
                    <q-card-section class="q-pt-none">
                        <!-- {{activerow}} -->
                    </q-card-section>
                    <q-input
                    filled
                    dense
                    value="cnm"
                    v-model="cnm"
                    label="Nome Cliente"
                    lazy-rules
                    style="width: 400px"
                    :rules="[val => val !== null && val !== '' || 'Insira dados']"
                    />

                    <q-input
                    filled
                    dense
                    value="ph"
                    v-model="ph"
                    label="Fone (11-digitos)"
                    lazy-rules
                    style="width: 400px"
                    :rules="[val => val !== null && val !== '' || 'Insira dados']"
                    />
            
                    <q-input
                    filled
                    dense
                    value="addr"
                    v-model="addr"
                    label="Endereço"
                    lazy-rules
                    style="width: 400px"
                    :rules="[val => val !== null && val !== '' || 'Insira dados']"
                    />

                    <div>
                        <q-btn  label="Adicionar" type="submit" color="primary" size="12px"/>
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" size="12px" />
                    </div>
                </q-form>
            
    
            </div>


        <q-separator />

          <!-- <q-btn flat label="Confirmar"  color="primary" v-close-popup /> -->
          <q-btn flat label="Fechar" color="primary" v-close-popup />

      </q-card>
      </q-dialog>

    </div>
</template>
  
<script>
  import { useQuasar } from 'quasar'
  import {ref, onMounted} from 'vue'
  import {api} from 'boot/axios'


  export default {
    methods: {
        openmodel(row){
            console.log("hi")
            this.alter=true;
            this.id = row.id;
            this.cnm = row.customer_name;
            this.ph = row.phone;
            this.addr = row.addr
        }
    },
    setup () {

    const $q = useQuasar()


    const id = ref(null)
    const cnm = ref(null)
    const ph = ref(null)
    const addr = ref(null)   

    const rows = ref([])



    const showNotif = () => {
        $q.notify({
          message: 'Teste',
          color: 'purple'
        })
    }


    const fetchData =  async () => {
      try {
        //const data = await fetch('http://localhost:3001/customers/api/v1/cons');
        const {data} = await api.get('http://localhost:3001/customers/api/v1/cust');
        console.log(data)
        //const info = await data.json();
        //console.log(info.rows)
        rows.value = data;

      } catch (error) {

        }
    }

   
    const columns = [

        { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
        { name: 'customer_name', align: "left", label: 'Nome Cliente', field: 'customer_name', sortable: true },
        { name: 'phone', align: "left", label: 'Fone', field: 'phone' },
        { name: 'addr', align: "left", label: 'Endereço', field: 'addr', sortable: true },
        { name: 'edit', align: "left", label: 'Editar', field: 'edit', sortable: true },
        { name: 'delete', align: "delete", label: 'Deletar', field: 'delete', sortable: true }

    ];


    onMounted(()=>{

        fetchData();

       
    })


    const handleDelete = async (rows, id) => {
        
        try {
            console.log('item deletado')
            const options = {method: 'DELETE'};
            //console.log(id)
            const deleteProd = await fetch(`http://localhost:3001/customers/api/v1/cust/${String(id)}`, options);
            //await del()

            fetchData()
           
        } catch (error) {
            
        }
        
    }

    return {
        columns,
        rows,
        alter: ref(false),

        id,
        cnm,
        ph,
        addr,
        handleDelete,
        fetchData,
        //openmodel,


        onSubmit (id, customer_name, phone, addr) {

            try {
                const body = {customer_name, phone, addr};
    
                const response = api.put(`http://localhost:3001/customers/api/v1/cust/${String(id)}`, body)

                $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Registro Atualizado'
            })

                fetchData()
                
            } catch (error) {
                
            }
        },

        
        onReset () {
            cnm.value = null
            ph.value = null
            addr.value = null
        }
    }
    
    }
  }

  
</script>
  