<template>
  <div class="q-pa-md">
    <div class="">
      <h4>Lista de Produtos</h4>
    </div>
    <q-table
      title="Produtos"
      bordered
      :data="data"
      :columns="columns"
      row-key="name"
      no-data-label="Nenhum produto cadastrado."
    >
    <template v-slot:top>
      <q-btn dense color="secondary" label="Novo Produto" @click="newProduct" no-caps></q-btn>
      <div class="q-pa-sm q-gutter-sm">
        <q-dialog v-model="show_dialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Adicionar Novo Produto</div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <q-input ref="codigo" v-model="editedItem.codigo" label="Código:" :rules="[val => !!val || 'campo obrigatório']"></q-input>
                <q-input ref="nome" v-model="editedItem.nome" label="Nome:" :rules="[val => !!val || 'campo obrigatório']"></q-input>
                <q-input type="textarea" ref="descricao" v-model="editedItem.descricao" label="Descrição:" :rules="[val => !!val || 'campo obrigatório']"></q-input>
                <q-input type="number" min="0" ref="preco" v-model="editedItem.preco" label="Preço:" :rules="[val => !!val || 'campo obrigatório']"></q-input>
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
          <q-td key="codigo" :props="props">{{ props.row.codigo }}</q-td>
          <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
          <q-td type="textarea" key="descricao" :props="props">{{ props.row.descricao }}</q-td>
          <q-td type="number" min="0" key="preco" :props="props">{{ props.row.preco }}</q-td>
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
  name: 'PageIndex',
  data () {
    return {
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
        { name: 'codigo', align: 'center', label: 'Código', field: 'codigo' },
        { name: 'nome', align: 'center', label: 'nome', field: 'nome' },
        { name: 'descricao', align: 'left', label: 'Descrição', field: 'descricao' },
        { name: 'preco', align: 'center', label: 'Preço R$', field: 'preco' },
        { name: 'actions', align: 'left', label: 'Ações', field: 'actions' }
      ],
      data: []
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    newProduct () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.show_dialog = true
    },
    addRow () {
      this.$refs.codigo.validate()
      this.$refs.nome.validate()
      this.$refs.descricao.validate()
      this.$refs.preco.validate()

      if (!this.$refs.codigo.hasError && !this.$refs.nome.hasError && !this.$refs.descricao.hasError && !this.$refs.preco.hasError) {
        if (this.editedIndex > -1) {
          const index = this.editedIndex
          this.updateProduct(index)
        } else {
          this.storeProduct()
        }
        this.close()
      }
    },
    deleteItem (item) {
      const index = this.data.indexOf(item)
      if (confirm('Confirme a exclusão do produto.')) {
        this.deleteProduct(this.data[index].id, index)
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
    async storeProduct () {
      const response = await axios.post('http://localhost:8765/produtos/add', {
        codigo: this.editedItem.codigo,
        nome: this.editedItem.nome,
        descricao: this.editedItem.descricao,
        preco: this.editedItem.preco
      })
      if (response.status === 200) {
        console.log(response.data)
        this.$q.notify('Criado um novo produto')
        this.data.push(this.editedItem)
      } else {
        console.error('Erro na criação de produto')
        this.$q.notify('Erro ao criar novo produto')
      }
    },
    async updateProduct (index) {
      const response = await axios.post('http://localhost:8765/produtos/edit/' + this.data[index].id, {
        codigo: this.editedItem.codigo,
        nome: this.editedItem.nome,
        descricao: this.editedItem.descricao,
        preco: this.editedItem.preco
      })
      if (response.status === 200) {
        console.log(response.data)
        Object.assign(this.data[index], this.editedItem)
        this.$q.notify('Dados do produto atualizados')
      } else {
        console.error('Erro no update de produto')
        this.$q.notify('Erro ao atualizar dados do produto')
      }
    },
    async getProducts () {
      const response = await axios.get('http://localhost:8765/produtos/index')
      if (response.status === 200) {
        console.log(response.data)
        this.data = response.data
      } else {
        console.error('Erro na requisição de produtos')
      }
    },
    async deleteProduct (id, index) {
      const response = await axios.post('http://localhost:8765/produtos/delete/' + id)
      if (response.status === 200) {
        console.log(response.data)
        this.$q.notify('Produto removido')
        this.data.splice(index, 1)
      } else {
        console.error('Erro ao remover produto')
        this.$q.notify('Erro ao remover produto')
      }
    }
  }
}

</script>
