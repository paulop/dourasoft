<template>
  <q-input bottom-slots v-model="text" placeholder="Buscar cliente..." :dense="dense">
    <template v-slot:append>
      <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
      <q-icon name="search" @click="text !== '' ? searchClient(text) : ''"/>
      <q-dialog v-model="showResultSearch">
        <q-card>
          <q-card-section>
            <div class="text-h6">Busca por Clientes</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 60vh" class="scroll">
            <q-table
              title="Clientes"
              bordered
              :data="resultSearch"
              :columns="columns"
              row-key="name"
              no-data-label="Nenhum cliente encontrado!"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
                  <q-td key="telefone" :props="props">{{ props.row.telefone }}</q-td>
                    <q-btn color="blue" label="Selecionar" @click="selectClient(props.row)" size=sm no-caps></q-btn>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Fechar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
    <template v-slot:after>
      <q-btn dense color="secondary" icon="perm_identity" label="Novo Cliente" @click="newClient" no-caps/>
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
                <q-btn flat label="OK" color="primary" @click="addClient" ></q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
    </template>
  </q-input>
</template>
<script>
const axios = require('axios')

export default {
  name: 'SearchAndNewClient',
  data () {
    return {
      showResultSearch: false,
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
        { name: 'actions', align: 'left', label: 'Ações', field: 'actions' }
      ],
      text: '',
      dense: false,
      data: [],
      cliente: {},
      resultSearch: []
    }
  },
  methods: {
    newClient () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.show_dialog = true
    },
    selectClient (item) {
      // selecionado
      const index = this.resultSearch.indexOf(item)
      this.$emit('envia_cliente', {
        cliente: this.resultSearch[index]
      })
      this.showResultSearch = false
    },
    addClient () {
      this.$refs.nome.validate()
      this.$refs.telefone.validate()
      this.$refs.endereco.validate()

      if (!this.$refs.nome.hasError && !this.$refs.telefone.hasError && !this.$refs.endereco.hasError) {
        this.storeClient()
        this.close()
      }
    },
    envia_cliente_para_pai () {
      this.$emit('envia_cliente', {
        cliente: this.cliente
      })
    },
    close () {
      this.show_dialog = false
    },
    showResult () {
      this.showResultSearch = true
      this.text = ''
    },
    async searchClient (text) {
      const response = await axios.post('http://localhost:8765/clientes/search', { texto: text })
      if (response.status === 200) {
        this.resultSearch = response.data
        this.showResult()
      } else {
        console.error('Erro na busca de clientes')
      }
    },
    async storeClient () {
      const response = await axios.post('http://localhost:8765/clientes/add', {
        nome: this.editedItem.nome,
        telefone: this.editedItem.telefone,
        endereco: this.editedItem.endereco
      })
      if (response.status === 200) {
        console.log(response.data)
        this.cliente = response.data
        this.$q.notify('Criado um novo cliente')
        this.envia_cliente_para_pai()
      } else {
        console.error('Erro na criação de clientes')
        this.$q.notify('Erro ao criar novo cliente')
      }
    }
  }
}
</script>
<style scoped>

</style>
