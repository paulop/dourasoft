<template>
  <div class="q-pa-md">
    <div v-if="!editmode" class="">
      <h4>Lista de Pedidos</h4>
    </div>
    <div class="">
      <EditOrderComponent :editingItem="this.editingItem" v-if="editmode" @cancel="cancel()"/>
    </div>
    <q-table v-if="!editmode"
      title="Pedidos"
      bordered
      :data="data"
      :columns="columns"
      row-key="name"
      no-data-label="Nenhum pedido cadastrado."
    >
      <template v-slot:top>
        <q-btn dense color="secondary" label="Novo Pedido" to="/pedidos/new" no-caps></q-btn>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="cliente" :props="props">{{ props.row.cliente.nome }}</q-td>
          <q-td key="data" :props="props">{{ new Date(props.row.created_at).toLocaleString() }}</q-td>
          <q-td key="status" :props="props">{{ props.row.status }}</q-td>
          <q-td type="number" min="0" key="total" :props="props">{{ props.row.total }}</q-td>
          <q-td>
            <q-btn color="blue" label="Editar" @click="editItem(props.row)" size=sm no-caps></q-btn>
            <q-btn color="red" label="Excluir"  @click="deleteItem(props.row)" size=sm no-caps></q-btn>
          </q-td>
        </q-tr>
      </template>
      </q-table>
    </div>
</template>

<script>
import EditOrderComponent from 'components/EditOrderComponent.vue'
const axios = require('axios')

export default {
  name: 'PageIndex',
  components: { EditOrderComponent },
  data () {
    return {
      editmode: false,
      show_dialog: false,
      editedIndex: -1,
      editedItem: {
        codigo: '',
        nome: '',
        descricao: '',
        preco: ''
      },
      defaultItem: {
        codigo: '',
        nome: '',
        descricao: '',
        preco: '0.0'
      },
      columns: [
        { name: 'cliente', align: 'center', label: 'Cliente', field: 'cliente.nome' },
        { name: 'data', align: 'center', label: 'Data', field: 'created_at' },
        { name: 'status', align: 'center', label: 'Status', field: 'status' },
        { name: 'total', align: 'center', label: 'Valor Total', field: 'total' },
        { name: 'actions', align: 'left', label: 'Ações', field: 'actions' }
      ],
      data: [],
      editingItem: {}
    }
  },
  mounted () {
    this.getPedidos()
  },
  methods: {
    deleteItem (item) {
      const index = this.data.indexOf(item)
      if (confirm('Confirme a exclusão do pedido.')) {
        this.deletePedido(this.data[index].id, index)
      }
    },
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editmode = true
      this.editingItem = Object.assign({}, this.data[this.editedIndex])
    },
    cancel () {
      this.editmode = false
    },
    async getPedidos () {
      const response = await axios.get('http://localhost:8765/pedidos/index')
      if (response.status === 200) {
        console.log(response.data)
        this.data = response.data
      } else {
        console.error('Erro na requisição de pedidos')
      }
    },
    async deletePedido (id, index) {
      const response = await axios.post('http://localhost:8765/pedidos/delete/' + id)
      if (response.status === 200) {
        console.log(response.data)
        this.$q.notify('Pedido removido')
        this.data.splice(index, 1)
      } else {
        console.error('Erro ao remover pedido')
        this.$q.notify('Erro ao remover pedido')
      }
    }
  }
}
</script>
