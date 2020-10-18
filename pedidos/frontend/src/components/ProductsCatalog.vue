<template>
<div>
  <div class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col">
         <q-table
      flat
      bordered
      class="statement-table"
      title="Catálogo de Produtos"
      :data="currencyData"
      :hide-header="mode === 'grid'"
      :columns="currencyColumns"
      row-key="name"
      :grid="mode == 'grid'"
      :filter="filter"
      virtual-scroll
      no-data-label="Nenhum produto cadastrado!"
      no-results-label="Nenhum produto encontrado!"
    >
      <template v-slot:top-right="props">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar produto..."
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid';
            separator = mode === 'grid' ? 'none' : 'horizontal';
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
            mode === "grid" ? "List" : "Grid"
          }}</q-tooltip>
        </q-btn>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="codigo" :props="props">
            {{ props.row.codigo }}
          </q-td>
          <q-td key="nome" :props="props">
            {{ props.row.nome }}
          </q-td>
          <q-td key="descricao" :props="props">
            {{ props.row.descricao }}
        </q-td>
        <q-td key="preco" :props="props">
            {{ props.row.preco }}
        </q-td>
        <q-td key="action" :props="props">
            <div class="q-gutter-sm">
              <q-btn dense color="blue" field="edit" icon="shopping_cart" @click="buyItem(props.row)" ></q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                  <q-item-label caption v-if="col.name !== 'action'">{{ col.value }}</q-item-label>
                  <template v-else>
                    <q-btn dense color="blue" field="edit" icon="shopping_cart" @click="buyItem(props.row)" ></q-btn>
                  </template>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
      </div>
    </div>
    </div>
</div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'ProductsCatalog',
  props: {
    listadeprodutos: []
  },
  data () {
    return {
      noti: () => {},
      show_dialog: false,
      editedIndex: -1,
      modelProduct: {
        id: '',
        codigo: '',
        nome: '',
        quantidade: '',
        preco: '',
        valortotal: ''
      },
      editedItem: {
        id: '',
        codigo: '',
        nome: '',
        descricao: '',
        preco: ''
      },
      defaultItem: {
        id: '',
        codigo: '',
        nome: '',
        descricao: '',
        preco: ''
      },
      filter: '',
      mode: 'grid',
      currencyColumns: [
        {
          name: 'codigo',
          align: 'left',
          label: 'Código',
          field: 'codigo',
          sortable: true
        },
        {
          name: 'nome',
          align: 'center',
          label: 'Nome',
          field: 'nome',
          sortable: true
        },
        {
          name: 'descricao',
          align: 'left',
          label: 'Descrição',
          field: 'descricao',
          sortable: true
        },
        {
          name: 'preco',
          align: 'center',
          label: 'Preço R$',
          field: 'preco',
          sortable: true
        },
        {
          name: 'action',
          align: 'right',
          label: 'Comprar',
          field: 'action',
          sortable: true
        }
      ],
      currencyData: [],
      data: {},
      modeloProduto: {}
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    async getProducts () {
      const response = await axios.get('http://localhost:8765/produtos/index')
      if (response.status === 200) {
        console.log(response.data)
        this.currencyData = response.data
      } else {
        console.error('Erro na requisição de produtos')
      }
    },
    buyItem (item) {
      this.editedIndex = this.currencyData.indexOf(item)
      this.modeloProduto = Object.assign({}, this.currencyData[this.editedIndex])
      this.$set(this.modeloProduto, 'quantidade', 1)
      this.$set(this.modeloProduto, 'valortotal', this.modeloProduto.preco)
      this.$emit('adiciona_produto', {
        data: this.modeloProduto
      })
      this.modeloProduto = {}
    }
  }
}

</script>

<style scoped>

</style>
