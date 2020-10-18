<template>
    <div class="q-pa-md">
      <q-table
        title="Lista de Produtos do Pedido"
        dense
        bordered
        :data="dados"
        :columns="columns"
        row-key="name"
        virtual-scroll
        no-data-label="Pedido vazio."
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="codigo" :props="props">{{ props.row.codigo }}</q-td>
          <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
          <q-td key="quantidade" :props="props">
            <input style="max-width: 65px" type="number" align="center" min="1" v-model.number="props.row.quantidade" dense @change="calculateTotal(props.row)"/>
          </q-td>
          <q-td key="preco" :props="props">{{ props.row.preco }}</q-td>
          <q-td key="valortotal" :props="props">{{ props.row.valortotal }}</q-td>
            <q-btn color="red" label="Remover"  @click="deleteItem(props.row)" size=sm no-caps></q-btn>
        </q-tr>
      </template>
      </q-table>
      <div class="q-pa-md">
        <q-input type="text" readonly label="Valor Total R$: " v-model="this.totalPedido"></q-input>
        <q-btn color="green" label="Fechar Pedido"  @click="sendData()" size=md no-caps></q-btn>
        <q-btn color="red" label="Cancelar"  @click="cancel()" size=md no-caps></q-btn>
      </div>
    </div>
</template>

<script>

export default {
  name: 'OrderProducts',
  props: {
    produtonovo: {},
    initialData: []
  },
  computed: {
  },
  data () {
    return {
      totalPedido: 0.0,
      show_dialog: false,
      editedIndex: -1,
      editedItem: {
        id: '',
        codigo: '',
        nome: '',
        quantidade: '',
        preco: '',
        valortotal: ''
      },
      defaultItem: {
        id: '',
        codigo: '',
        nome: '',
        quantidade: '1',
        preco: '',
        valortotal: ''
      },
      columns: [
        { name: 'codigo', align: 'center', label: 'Código', field: 'codigo' },
        { name: 'nome', align: 'center', label: 'Nome', field: 'nome' },
        { name: 'quantidade', align: 'center', label: 'Quantidade', field: 'quantidade' },
        { name: 'preco', align: 'center', label: 'Valor Unitário R$', field: 'preco' },
        { name: 'valortotal', align: 'center', label: 'Valor Total R$', field: 'valortotal' },
        { name: 'actions', align: 'left', label: 'Ações', field: 'actions' }
      ],
      dados: [],
      produtoAuxiliar: {}
    }
  },
  mounted () {
  },
  watch: {
    initialData () {
      this.loadData()
    },
    produtonovo () {
      this.setNewProduct()
    }
  },
  methods: {
    loadData () {
      this.initialData.forEach(element => {
        this.produtoAuxiliar = Object.assign({}, this.editedItem)
        this.produtoAuxiliar.id = element.produto.id
        this.produtoAuxiliar.codigo = element.produto.codigo
        this.produtoAuxiliar.nome = element.produto.nome
        this.produtoAuxiliar.quantidade = element.quantidade
        this.produtoAuxiliar.preco = element.produto.preco
        this.produtoAuxiliar.valortotal = element.quantidade * element.produto.preco
        this.totalPedido += this.produtoAuxiliar.valortotal
        this.dados.push(this.produtoAuxiliar)
      })
      this.produtoAuxiliar = {}
    },
    sendData () {
      this.$emit('processPedido', [this.dados, this.totalPedido])
    },
    setNewProduct () {
      this.listadeprodutos = []
      this.totalPedido = 0.0
      var adicionado = false
      for (let index = 0; index < this.dados.length; index++) {
        if (this.dados[index].id === this.produtonovo.id) {
          adicionado = true
        }
        const element = this.dados[index]
        this.totalPedido += parseFloat(element.valortotal)
      }
      if (this.produtonovo.nome !== undefined) {
        if (!adicionado) {
          this.totalPedido += parseFloat(this.produtonovo.valortotal)
          this.dados.push(this.produtonovo)
          this.produtonovo = {}
        } else {
          alert('Produto já foi adicionado!')
          this.produtonovo = {}
        }
      }
    },
    calculateTotal (item) {
      const index = this.dados.indexOf(item)
      this.totalPedido -= this.dados[index].valortotal
      this.$set(this.dados[index], 'quantidade', item.quantidade)
      this.$set(this.dados[index], 'valortotal', item.quantidade * item.preco)
      this.totalPedido += this.dados[index].valortotal
    },
    deleteItem (item) {
      const index = this.dados.indexOf(item)
      if (confirm('Remover produto do pedido?')) {
        this.totalPedido -= item.valortotal
        this.$q.notify('Item removido da lista')
        this.dados.splice(index, 1)
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}

</script>
