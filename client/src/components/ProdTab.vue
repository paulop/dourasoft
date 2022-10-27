<template>
    <div class="q-pa-md">
        <q-table
        title="Listagem de Produtos"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[20]"
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

      <q-dialog v-model="edit">
            <q-card style="max-width: 500px;width:500px;height:470px">
                <q-card-section>
                    <div class="text-h6">Editar produto</div>
                </q-card-section>

                <q-separator />
          

            <div class="q-ma-md flex justify-evenly " style="height: 320px">
            
                <q-form
                    @submit="onSubmit(id, pr, nm, dsc, pri )"
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
                    value="pr"
                    v-model.number="pr"
                    label="Código"
                    lazy-rules
                    style="width: 400px"
                    :rules="[ val => val && true || 'Insira dados']"
                    />

                    <q-input
                    filled
                    dense
                    v-model="nm"
                    label="Produto"
                    lazy-rules
                    style="width: 400px"
                    :rules="[val => val !== null && val !== '' || 'Insira dados']"
                    />
            
                    <q-input
                    filled
                    dense
                    v-model="dsc"
                    label="Descrição"
                    lazy-rules
                    style="width: 400px"
                    :rules="[val => val !== null && val !== '' || 'Insira dados']"
                    />

                    <q-input
                    filled
                    dense
                    type="number"
                    step="any"
                    v-model.number="pri"
                    label="Preço"
                    lazy-rules
                    style="width: 400px"
                    :rules="[ val => val && true || 'Insira dados']"
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
            this.edit=true;
            this.id = row.id;
            this.pr = row.cod_prod;
            this.nm = row.prod_name;
            this.dsc = row.description;
            this.pri = row.price
        }
    },
    setup () {

    const $q = useQuasar()


    const id = ref(null)
    const pr = ref(null)
    const nm = ref(null)
    const dsc = ref(null)
    const pri = ref(null)   

    const rows = ref([])



    const showNotif = () => {
        $q.notify({
          message: 'Teste',
          color: 'purple'
        })
    }


    const fetchData =  async () => {
      try {
        //const data = await fetch('http://localhost:3001/api/v1/regs');
        const {data} = await api.get('http://localhost:3001/api/v1/regs');
        console.log(data)
        //const info = await data.json();
        //console.log(info.rows)
        rows.value = data;

      } catch (error) {

        }
    }

   
    const columns = [

        { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
        { name: 'cod_prod', align: "left", label: 'Código Produto', field: 'cod_prod', sortable: true },
        { name: 'name', align: "left", label: 'Nome', field: 'prod_name' },
        { name: 'description', align: "left", label: 'Descrição', field: 'description' },
        { name: 'price', align: "left", label: 'Preço', field: 'price', sortable: true },
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
            const deleteProd = await fetch(`http://localhost:3001/api/v1/regs/${String(id)}`, options);
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
        pr,
        nm,
        dsc,
        pri,
        handleDelete,
        fetchData,
        //openmodel,


        onSubmit (id, cod_prod, prod_name, description, price) {

            try {
                const body = {cod_prod, prod_name, description, price};
    
                const response = api.put(`http://localhost:3001/api/v1/regs/${String(id)}`, body)

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
            pr.value = null
            nm.value = null
            dsc.value = null
            pri.value = null
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
  