<template>
  <div class="q-pa-md">
    <div class="">
      <h4>Lista de Clientes</h4>
    </div>
    <q-table
      title="Clientes"
      bordered
      :data="data"
      :columns="columns"
      row-key="name"
      no-data-label="Nenhum cliente cadastrado."
    >
    <template v-slot:top>
      <q-btn dense color="secondary" label="Novo Cliente" @click="newClient" no-caps></q-btn>
      <div class="q-pa-sm q-gutter-sm">
        <q-dialog v-model="show_dialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Adicionar Novo Cliente</div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <q-input ref="nome" v-model="editedItem.nome" label="Nome:" :rules="[val => !!val || 'campo obrigatório']"></q-input>
                <q-input ref="telefone" v-model="editedItem.telefone" label="Telefone:" :rules="[val => !!val || 'campo obrigatório']"></q-input>
                <q-input ref="endereco" v-model="editedItem.endereco" label="Endereço:" :rules="[val => !!val || 'campo obrigatório']"></q-input>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" v-close-popup></q-btn>
              <q-btn flat label="OK" color="primary" @click="addRow" ></q-btn>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
          <q-td key="telefone" :props="props">{{ props.row.telefone }}</q-td>
          <q-td key="endereco" :props="props">{{ props.row.endereco }}</q-td>
            <q-btn color="blue" label="Editar" @click="editItem(props.row)" size=sm no-caps></q-btn>
            <q-btn color="red" label="Excluir"  @click="deleteItem(props.row)" size=sm no-caps></q-btn>
        </q-tr>
      </template>
      </q-table>
    </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'ListClientes',
  data () {
    return {
      show_dialog: false,
      editedIndex: -1,
      editedItem: {
        nome: '',
        telefone: '',
        endereco: ''
      },
      defaultItem: {
        nome: '',
        telefone: '',
        endereco: ''
      },
      columns: [
        { name: 'nome', align: 'center', label: 'Nome', field: 'nome' },
        { name: 'telefone', align: 'left', label: 'Telefone', field: 'telefone' },
        { name: 'endereco', align: 'left', label: 'Endereço', field: 'endereco' },
        { name: 'actions', align: 'left', label: 'Ações', field: 'actions' }
      ],
      data: []
    }
  },
  mounted () {
    this.getClients()
  },
  methods: {
    newClient () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.show_dialog = true
    },
    addRow () {
      this.$refs.nome.validate()
      this.$refs.telefone.validate()
      this.$refs.endereco.validate()

      if (!this.$refs.nome.hasError && !this.$refs.telefone.hasError && !this.$refs.endereco.hasError) {
        if (this.editedIndex > -1) {
          const index = this.editedIndex
          this.updateClient(index)
        } else {
          this.storeClient()
        }
        this.close()
      }
    },
    deleteItem (item) {
      const index = this.data.indexOf(item)
      if (confirm('Confirme a exclusão do cliente.')) {
        this.deleteClient(this.data[index].id, index)
      }
    },
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.show_dialog = true
    },
    close () {
      this.show_dialog = false
      setTimeout(() => {
        this.editedIndex = -1
      }, 300)
    },
    async storeClient () {
      const response = await axios.post('http://localhost:8765/clientes/add', {
        nome: this.editedItem.nome,
        telefone: this.editedItem.telefone,
        endereco: this.editedItem.endereco
      })
      if (response.status === 200) {
        console.log(response.data)
        this.$q.notify('Criado um novo cliente')
        this.data.push(this.editedItem)
      } else {
        console.error('Erro na criação de clientes')
        this.$q.notify('Erro ao criar novo cliente')
      }
    },
    async updateClient (index) {
      const response = await axios.post('http://localhost:8765/clientes/edit/' + this.data[index].id, {
        nome: this.editedItem.nome,
        telefone: this.editedItem.telefone,
        endereco: this.editedItem.endereco
      })
      if (response.status === 200) {
        console.log(response.data)
        Object.assign(this.data[index], this.editedItem)
        this.$q.notify('Dados do cliente atualizados')
      } else {
        console.error('Erro no update de clientes')
        this.$q.notify('Erro ao atualizar dados do cliente')
      }
    },
    async getClients () {
      const response = await axios.get('http://localhost:8765/clientes/index')
      if (response.status === 200) {
        console.log(response.data)
        this.data = response.data
      } else {
        console.error('Erro na requisição de clientes')
      }
    },
    async deleteClient (id, index) {
      const response = await axios.post('http://localhost:8765/clientes/delete/' + id)
      if (response.status === 200) {
        console.log(response.data)
        this.$q.notify('Cliente removido')
        this.data.splice(index, 1)
      } else {
        console.error('Erro na requisição de clientes')
        this.$q.notify('Erro ao remover cliente')
      }
    }
  }
}

</script>
