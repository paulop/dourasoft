<template>
    <div class="q-pa-md">
        <q-table
        title="Listagem de Pedidos"
        :rows="rows"
        :columns="columns"
        row-key="name"
        >
            <template v-slot:top-right>
                <q-btn dense debounce="300" v-model="sch" placeholder="Busca/insere cliente">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
                </q-btn>
            </template>
            <template v-slot:body-cell-detail="props">
                <q-td :props="props">
                    <q-btn @click="handleDetail(props.row.id)" dense round color="secondary" icon="article"/>
                </q-td>
            </template>
      
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

      <q-dialog v-model="edit">
            <q-card style="max-width: 500px;width:500px;height:470px">
                <q-card-section>
                    <div class="text-h6">Editar Pedidos</div>
                </q-card-section>

                <q-separator />
          

            <div class="q-ma-md flex justify-evenly " style="height: 320px">
            
                <q-form
                    @submit="onSubmit(id, ci, dt, st )"
                    @reset="onReset"
                    
                    class="q-gutter-xs"
                >
                    <q-card-section class="q-pt-none">
                        <!-- {{activerow}} -->
                    </q-card-section>
                    <q-input
                    filled
                    dense
                    type="number"
                    value="ci"
                    v-model.number="ci"
                    label="Código Cliente"
                    lazy-rules
                    style="width: 400px"
                    :rules="[ val => val && true || 'Insira dados']"
                    />

                    <q-input
                    filled
                    dense
                    v-model="dt"
                    label="Data"
                    lazy-rules
                    style="width: 400px"
                    :rules="[val => val !== null && val !== '' || 'Insira dados']"
                    />
            
                    <q-input
                    filled
                    dense
                    v-model="st"
                    label="Status"
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
  import {useRouter} from 'vue-router'



  export default {
    methods: {
        openmodel(row){
            console.log("hi")
            this.edit=true;
            this.id = row.id;
            this.ci = row.customer_id;
            this.dt = row.date;
            this.st = row.status;
            this.tot = row.total;
        }
    },
    setup () {

    const $q = useQuasar()

    const router = useRouter()

    const id = ref(null)
    const ci = ref(null)
    const dt = ref(null)
    const st = ref(null)
    const tot = ref(null)

    const rows = ref([])

    const showNotif = () => {
        $q.notify({
          message: 'Teste',
          color: 'purple'
        })
    }

    const fetchData =  async () => {
      try {
        //const data = await fetch('http://localhost:3001/orders/api/v1/ord');
        const {data} = await api.get('http://localhost:3001/orders/api/v1/ord');
        console.log(data)
        //const info = await data.json();
        //console.log(info.rows)
        rows.value = data;

      } catch (error) {

        }
    }

   
    const columns = [

        { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
        { name: 'customer_id', align: "left", label: 'Código Cliente', field: 'customer_id', sortable: true },
        { name: 'date', align: "left", label: 'Data', field: 'date' },
        { name: 'status', align: "left", label: 'Status', field: 'status' },
        { name: 'total', align: "left", label: 'Total', field: 'total' },
        { name: 'detail', align: "left", label: 'Detalhes', field: 'detail', sortable: true },
        { name: 'edit', align: "left", label: 'Editar', field: 'edit', sortable: true },
        { name: 'delete', align: "delete", label: 'Deletar', field: 'delete', sortable: true }

    ];

    const handleDetail = (id) => {
        router.push({name:'Details', params:{id}})
    }


    onMounted(()=>{

        fetchData();

       
    })


    const handleDelete = async (rows, id) => {
        
        try {
            console.log('item deletado')
            const options = {method: 'DELETE'};
            //console.log(id)
            const deleteProd = await fetch(`http://localhost:3001/orders/api/v1/ord/${String(id)}`, options);
            //await del()

            fetchData()
           
        } catch (error) {
            
        }
        
    }

    return {
        columns,
        rows,
        edit: ref(false),

        id,
        ci,
        dt,
        st,
        tot,
        handleDelete,
        fetchData,
        handleDetail,
        //openmodel,


        onSubmit (id, customer_id, date, status) {

            try {
                const body = {customer_id, date, status};

                console.log(body)
    
                const response = api.put(`http://localhost:3001/orders/api/v1/ord/${String(id)}`, body)

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
            ci.value = null
            dt.value = null
            st.value = null
        }
    }
    /*
    methods:{
        openmodel(row){
            console.log("hi")
            this.selected_row = row;
            this.alert=true;
        }
    }
    */
    
    }
  }

  
</script>
  