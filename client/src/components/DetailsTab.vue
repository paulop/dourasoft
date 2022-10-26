<template>
    <div class="q-pa-md">
    <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        style="width: 900px;"
        :rows-per-page-options="[10]"
        >
        <template v-slot:top-left><q-tr class="q-pa-md text-h6">Venda #{{getId}}</q-tr></template>

        <template v-slot:top-right>
            <div class="q-pa-md q-gutter-sm justify-left">
                <q-btn  label="Retorna Tela Pedidos" @click="returnPage()" color="primary" size="10px"/>
            </div>
        </template>

        <template v-slot:body-cell-delete="props">
            <q-td :props="props">
                <div class="q-gutter-sm flex flex-center">
                    <q-btn dense color="grey" size="xs" @click="handleDelete(props.row.id)" icon="close"/>
                </div>
            </q-td>
        </template> 
        
        <template v-slot:bottom-row>
            <q-tr class="flex-row justify-around text-bold">
                  <q-td>
                  </q-td>
                  <q-td>
                  </q-td>
                  <q-td>
                    Total
                  </q-td>
                  <q-td>
                    {{getTotal}}
                  </q-td>
            </q-tr>
        </template> 
            
    </q-table>
    </div>

    <div class="q-pa-md">
    <q-table
        :rows="srows"
        :columns="scols"
        row-key="name"  
         
        style="width: 500px"     
        :rows-per-page-options="[10]"
        >

        <template v-slot:top-left>
            <div class="row">  
            <div class="col-5">
                <div class="q-pa-xs text-h6">Inserir Produto</div>

            </div>
            <div class="col-1">

            </div>
            <div class="col-5">
                <q-input border dense debounce="300" type="text" @keydown.enter.prevent="submitSch()" v-model.trim="filter" hint="Digite + ENTER" placeholder="Pesquisar">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>

            </div>

            </div>  
        
        </template>

        <template v-slot:body-cell-quantity>
            <q-td>
                <div class="q-gutter-sm flex flex-center">
                    <q-input
                        dense
                        type="number"
                        v-model.number="itemqty"
                        label="Inserir"
                        @change="postQty()"
                        style="width: 50px"
                        lazy-rules
                        :rules="[ val => val && true || 'Insira dados']"
                    />
                </div>
            </q-td>
        </template>

        <template v-slot:body-cell-subtotal="props">
            <q-td :props="props">
                <div class="q-gutter-sm flex flex-center">
                    <q-input borderless dense v-model.number="sub" />
                </div>
            </q-td>
        </template> 

        <q-separator />
        <template v-slot:bottom-row>
            <div class="q-pa-md q-gutter-sm justify-left">
                <q-btn  label="Adicionar" @click="addOrditem(getId, pid, itemqty)" color="primary" size="12px"/>
            </div>
        </template>
    </q-table>

    </div>
    

</template>

<script>
    import { useQuasar } from 'quasar'
    import {ref, onMounted} from 'vue'
    import {api} from 'boot/axios'
    import {useRouter, useRoute} from 'vue-router'


export default {
   
    setup () {

    const $q = useQuasar()
    const route = useRoute();
    const router = useRouter();

    const getTotal = ref(0)
    const getId = ref(0)
    const itemqty = ref(1)

    const pid = ref(0)
    const qty = ref(null)
    const pri = ref(null)
    const sub = ref(null)
    const tot = ref(null)

    const rows = ref([])
    const srows = ref([])
    const filter = ref('')

    const returnPage = () => {
        router.push({name:'Orders'})
    }

    const showNotif = () => {
        $q.notify({
          message: 'Teste',
          color: 'purple'
        })
    }

    const submitSch = async () => {
        //console.log(cod_prod)
        const prod_name = filter.value
        const body = {prod_name};   
        console.log(body)   
        const {data} = await api.post('http://localhost:3001/api/v1/regs/spec', body)
        pri.value = data[0].price;
        pid.value = data[0].id;
        sub.value = itemqty.value*pri.value;
        srows.value = data;
        //getId.value, pid.value, itemqty.value 
        // itemqty.value
        console.log(data);
    }

    const postQty = () => {

        sub.value = parseFloat(itemqty.value*pri.value).toFixed(2);
    }

    const fetchDetails =  async (id) => {
      try {
        //const data = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(id)}`);
        const {data} = await api.get(`http://localhost:3001/orders/api/v1/ordet/${String(id)}`);
        console.log(data)
        //const info = await data.json();
        //console.log(info.rows)
        rows.value = data;

        getTotal.value = data.reduce((sum, data) => {
            return sum + parseFloat(data.subtotal);
        }, 0);
        console.log(getTotal.value)
        return parseFloat(getTotal.value).toFixed(2)

      } catch (error) {

        }
    }

    const addOrditem = async (order_id, product_id, quantity) => {
        
        try {
            const body = {order_id, product_id, quantity};
            console.log(body)
            const {data} = await api.post('http://localhost:3001/orders/api/v1/ordet', body)
            await console.log(data) 

            fetchDetails(order_id);

        } catch (error) {
                   
        }
        
    }
   
    const columns = [

        { name: 'prod_name', align: "left", label: 'Produto', field: 'prod_name', sortable: true },
        { name: 'quantity', align: "left", label: 'Quantidade', field: 'quantity' },
        { name: 'price', align: "left", label: 'Preço Unit.', field: 'price' },
        { name: 'subtotal', align: "left", label: 'Subtotal', field: 'subtotal' },
        { name: 'delete', align: "left", label: 'Remover', field: 'delete', sortable: true }

    ];
    const scols = [

        { name: 'prod_name', align: "left", label: 'Produto', field: 'prod_name', sortable: true },
        { name: 'quantity', align: "left", label: 'Quantidade', field: 'quantity' },
        { name: 'price', align: "left", label: 'Preço Unit.', field: 'price' },
        { name: 'subtotal', align: "left", label: 'Subtotal', field: 'subtotal' },

    ];

    const handleDetails = (id) => {
        router.push({name:'Details', params:{id}})
    }

    onMounted(()=>{
        // Encontra o parametro da requisicao com route (passados via url)
        getId.value= parseInt(route.params.id);
        fetchDetails(getId.value);
       
    })

    const handleDelete = async (id) => {
        
        try {
            console.log('item deletado')
            const options = {method: 'DELETE'};
            console.log(id)
            //const deleteProd = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(id)}`, options);
            const del = await api.delete(`http://localhost:3001/orders/api/v1/ordet/${String(id)}`, options);

            await console.log(del)

            fetchDetails(route.params.id)
           
        } catch (error) {
            
        }
        
    }

    return {
        columns,
        rows,
        srows,
        scols,
        filter,
        itemqty,

        getTotal,
        getId,

        pid,
        qty,
        pri,
        sub,
        tot,
        submitSch,
        handleDelete,
        fetchDetails,
        postQty,
        addOrditem,
        returnPage,


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
                //fetchDetails()
                
            } catch (error) {
                
            }
        },

        
        onReset () {
            //ci.value = null
            //dt.value = null
            //st.value = null
        }
    }

    }
  }

  
</script>

