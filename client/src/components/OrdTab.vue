<template>
    
    <div class="q-pa-lg">
        <q-table
        :rows="rows"
        :columns="columns"
        style="height:540px"
        row-key="name"
        :rows-per-page-options="[10]"
        >   
            <template #top>
                <div class="row justify-around">
                    <div class="col">
                        <div class="q-pa-sm text-h6">Listagem Pedidos</div>
                    </div>
                    <div class="col">
                        <q-btn class="q-mt-md q-pa-sm" @click="graphs=true" dense color="secondary" size='12px' label='Graficos'/>
                    </div>
                    <div class="col">
                        <q-btn class="q-mt-md q-pa-sm" @click="custSearch=true" dense color="secondary" size='12px' label='Busca Cliente'/>
                    </div>
                    <div class="col">
                        <div id="q-app" style="width:250px;height:20px">
                            <q-input filled v-model="dateRange" :model-value="`${dateRange.from} - ${dateRange.to}`" hint="Escolha faixa data">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="dateRange" range mask="YYYY-MM-DD">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" @click="captureDR()" color="primary" flat />
                                        </div>
                                        </q-date>
                                    </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                    </div>

                </div>
                
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
            
            <template #bottom-row>
                
            </template>   
      </q-table>

      <q-dialog v-model="graphs">
            <q-card style="max-width: 950px;width:950px;height:600px">
                <div class="row justify-between" style="height:80px">
                <div class="q-pa-md text-h5">Faturamento Mensal</div>
                <q-select class="q-pa-md  text-h6" style="width:280px;height:40px" outlined v-model="yearchoice" @update:model-value="manageSelect(yearchoice)" :options="options" label="Faturamentos Mensais" />
                </div>
                <q-separator />
                <q-card-section>
                    <div id="app">
                        <GChart
                            type="ColumnChart"
                            :data="chartData"
                            :options="chartOptions"
                            style="height:400px"                  
                            
                        />
                    </div>        
                </q-card-section>
            <q-separator />
            <!-- <q-btn flat label="Confirmar"  color="primary" v-close-popup /> -->
            <q-btn flat label="Fechar" color="primary" v-close-popup />
            </q-card>
        </q-dialog>

      <q-dialog v-model="custSearch">
        <q-card style="max-width: 650px;width:650px;height:700px">
            <q-card-section>
                <div class="flex row justify-around">
                    <div class="col">
                        <div class="text-h6">Buscar Cliente</div>
                    </div>
                    <div class="col">
                        <q-input border dense debounce="300" style="width: 170px" type="text" @keydown.enter.prevent="submitSch()" v-model.trim="sch" hint="Digite + ENTER" placeholder="Pesquisar">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                        </q-input>     
                    </div>
                </div>      
            </q-card-section>
            <q-separator/>
            <div class="q-pa-md">
                <q-table
                :rows="rows2"
                :columns="columns2"
                row-key="name"
                >
                </q-table>
            </div>
            <q-separator/>  
        <div class="q-ma-md flex justify-evenly " style="height: 320px">
            
            <q-form
                @submit="onSubmitCli(cnm, ph, addr)"
                @reset="onReset"
                class="q-gutter-xs"
            >
                <q-card-section class="q-pt-none">
                </q-card-section>

                <q-input
                filled
                dense
                v-model="cnm"
                label="Nome Cliente"
                lazy-rules
                style="width: 400px"
                :rules="[val => val !== null && val !== '' || 'Insira dados']"
                />

                <q-input
                filled
                dense
                v-model="ph"
                label="Fone"
                lazy-rules
                style="width: 400px"
                :rules="[val => val !== null && val !== '' || 'Insira dados']"
                />
        
                <q-input
                filled
                dense
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

      <q-dialog v-model="edit">
            <q-card style="max-width: 500px;width:500px;height:380px">
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
  import { GChart } from "vue-google-charts"



  export default {
    components: {
        GChart
    },
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

    const cnm = ref(null)
    const ph = ref(null)
    const addr = ref(null)

    const sch = ref(null)
    const graphs = ref(null)
    const yearchoice = ref(null)

    const rows = ref([])
    const rows2 = ref([])

    const chartData = ref([
                            ["Mes", "Faturamento"],
                            ["1", 0],
                            ["2", 0],
                            ["3", 0],
                            ["4", 0],
                            ["5", 0],
                            ["6", 0]
                        ])

    const dateRange = ref({from: '', to: ''})

    const dtr = ref({from: '2021-01-01', to: '2022-01-05'});

    const manageSelect= async (yearchoice) => {
        
        const body = {yearchoice};
        console.log(body)
        const {data} = await api.post('http://localhost:3001/orders/api/v1/sales', body);
        await console.log(data)

        //Conversao de JSON array para o formato do GChart
        let m = [
            data.map(value => value.mes),
            data.map(value => value.total)
        ];
        // Transpor a matriz
        let transpose = (array) => {
            return array.reduce((prev, next) => next.map((item, i) =>
                (prev[i] || []).concat(next[i])
            ), []);
        }
        let ano = [];
        let init = ['Mês', 'Faturamento'];
        let last = transpose(m);
        for (let i=0;i<last.length;i++){
            last[i][0] = String(last[i][0]);
            last[i][1] = parseFloat(last[i][1]);
        }
        //console.log(last)


        ano[0]=init;

        for (let i=0;i<last.length;i++){
            ano[i+1]=last[i]; 
            //ano[i][0] = String(ano[i][0]);
            //ano[0][i] = parseFloat(ano[0][i]).toFixed(2);
        }
        
        chartData.value = ano;

        console.log(ano) 

        

    }

    const captureDR = () => {
        
        fetchDataFilter()


    }

    const showNotif = (check) => {
        if (check) {
            $q.notify({
                message: 'Cliente existe na base. Retornar.',
                color: 'positive'
            })
        } else {
            $q.notify({
                message: 'Cliente não existe na base. Adicionar.',
                color: 'red'
            })
        }
        
    }

    // Get que preenche a tabela incial
    const fetchData =  async () => {
      try {
        //var dt = 
        //const body = {dateRange};
        console.log(dateRange)
        //const data = await fetch('http://localhost:3001/orders/api/v1/ord');
        const {data} = await api.get('http://localhost:3001/orders/api/v1/ord');
        console.log(data)
        //const info = await data.json();
        //console.log(info.rows)
        rows.value = data;

      } catch (error) {

        }
    }

    // Necessarioi mudar metodo para POST para contemplar dateRange como body
    const fetchDataFilter =  async () => {
      try {
        // Convertendo para Vue OBJ para Regular OBJ
        let newobj = JSON.parse(JSON.stringify(dateRange));
        let body = newobj._rawValue;
        console.log(body)
        const {data} = await api.post('http://localhost:3001/orders/api/v1/ordate', body);
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

    const columns2 = [

        { name: 'customer_name', align: "left", label: 'Nome Cliente', field: 'customer_name', sortable: true },
        { name: 'phone', align: "left", label: 'Fone', field: 'phone' },
        { name: 'addr', align: "left", label: 'Endereço', field: 'addr', sortable: true },
    ];

    const submitSch = async () => {

        const customer_name = sch.value;
        const body = {customer_name};   
        const {data} = await api.post('http://localhost:3001/customers/api/v1/cust/spec', body)

        console.log(data[0])
        rows2.value = data;

        if (data.length>0) {
            showNotif(true)
        }
        else{
            showNotif(false)
        }

    }

    const handleDetail = (id) => {
        router.push({name:'Details', params:{id}})
    }


    onMounted(()=>{

        fetchData();

       
    })

    const onSubmitCli = async (customer_name, phone, addr) => {
            
            try {
                const body = {customer_name, phone, addr};

                const {data} = await api.post('http://localhost:3001/customers/api/v1/cust', body)

                console.log(data)

                    $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: 'Registro Atualizado'
                })
              
                
            } catch (error) {
                
            }
            
    }


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
        rows2,
        columns2,
        edit: ref(false),
        custSearch: ref(false),
        dateRange,
        dtr,
        yearchoice,
        graphs,

        id,
        ci,
        dt,
        st,
        tot,
        sch,

        cnm,
        ph,
        addr,


        handleDelete,
        fetchData,
        fetchDataFilter,
        handleDetail,
        submitSch,
        showNotif,
        captureDR,
        manageSelect,
        onSubmitCli,

        model: ref(null),
        options:[
            '2022','2021','2020','2019','2018','2017',
        ],


        // Array will be automatically processed with visualization.arrayToDataTable function
        chartData,


        chartOptions: {
            chart: {

            },
            title: {
              text: 'Faturamento',
              align: 'left',
            },
            
        },


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
            // atualiza table
            setTimeout(() => {
                fetchData();
            }, "500")
                
                
            } catch (error) {
                
            }
        },

        

        
        onReset () {
            ci.value = null
            dt.value = null
            st.value = null
        }
    }   
    }
  }

  
</script>
  