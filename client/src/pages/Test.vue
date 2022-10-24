<template>
        <!--
    Forked from:
    https://quasar.dev/vue-components/table#example--body-cell-name-slot
    -->
    <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md">
        <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
        >
        <template v-slot:body-cell-name="props">
            <q-td :props="props">
            <div>
                <q-btn color="purple" :label="props.value" @click="openmodel(props.row)"></q-btn>
            </div>
            <div class="my-table-details">
                {{ props.row.details }}
            </div>
            </q-td>
        </template>
        </q-table>
        <q-dialog v-model="alert">
        <q-card>
            <q-card-section>
            <div class="text-h6">Alert</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
            {{selected_row}}
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" @click="alert=false" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
    </div>
    </div>

    
</template>
     
    <script>
    import {ref} from 'vue'

    const columns = [
    {
        name: 'name',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
    { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
    { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
    { name: 'protein', label: 'Protein (g)', field: 'protein' },
    { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ]


    const rows = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%'
    },
    {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: '6%',
        iron: '7%'
    },
    {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: '3%',
        iron: '8%'
    }
    ]

     
     
   export default ({
   
    name:'Test',
    
    setup () {
    /*
    const openmodel = (row) => {
        console.log("hi")
        this.selected_row = row;
        alert=true;
    }
    */
    return {
        columns,
        rows,
        alert:ref(false),
        selected_row:ref({})
        }
    },
    
    methods:{

        openmodel(row){
        console.log("hi")
        this.selected_row = row;
        this.alert=true;
        }
    }
    
   
   })
   
   </script>

   <style>
    .my-table-details {
        font-size: 0.85em;
        font-style: italic;
        max-width: 200px;
        white-space: normal;
        color: #555;
        margin-top: 4px;
        }
   </style>