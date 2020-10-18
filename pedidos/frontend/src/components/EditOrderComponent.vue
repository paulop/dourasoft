<template>
  <div class="q-pa-md">
    <div class="titulo">
      Editar Pedido
    </div>
    <div class="q-pa-md row flex client-identification">
      <div class="">
        <q-chip size="lg" icon="person">
        {{ this.editingItem.cliente.nome }}
        </q-chip>
      </div>
      <div class="">
        <q-chip size="lg" icon="phone">
          {{ this.editingItem.cliente.telefone }}
        </q-chip><br/>
      </div>
      <div class="">
        <q-chip size="lg" icon="house">
          {{ this.editingItem.cliente.endereco }}
        </q-chip>
      </div>
    </div>
    <div class="q-pa-md status-pedido">
      <q-select square style="max-width: 200px" outlined v-model="statusPedido" :options="options" label="Status do Pedido" />
    </div>
    <div class="row">
      <div class="col-md-6 produtos-pedido">
        <OrderProducts :produtonovo='this.produto' :initialData='this.listadeprodutos' @processPedido="processPedido" @cancel="cancel()"/>
      </div>
      <div class="col-md-6 catalogo-produtos">
        <ProductsCatalog @adiciona_produto="addProduct"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsCatalog from 'components/ProductsCatalog.vue'
import OrderProducts from 'components/OrderProducts.vue'
const axios = require('axios')

export default {
  name: 'EditOrderComponent',
  props: {
    editingItem: {}
  },
  mounted () {
    this.getListaProdutos()
    this.setStatus()
  },
  watch: {
    statusPedido () {
      this.produto = {}
    }
  },
  data () {
    return {
      cliente: [],
      produto: {},
      listadeprodutos: [],
      modelPedido: {
        cliente_id: '',
        total: '',
        status: '',
        created_at: '',
        lista_de_produtos: []
      },
      modelListaDeProdutos: {
        pedido_id: '',
        produto_id: '',
        quantidade: ''
      },
      pedidoAuxiliar: {},
      listaProdutosAuxiliar: {},
      statusInicial: this.editingItem.status,
      statusPedido: null,
      options: [
        'Aberto', 'Entregue', 'Cancelado']
    }
  },
  components: { ProductsCatalog, OrderProducts },
  methods: {
    async getListaProdutos () {
      const response = await axios.get('http://localhost:8765/listadeprodutos/searchlista/' + this.editingItem.id)
      if (response.status === 200) {
        console.log(response.data)
        this.listadeprodutos = response.data
      } else {
        console.error('Erro ao carregar lista de produtos')
      }
    },
    addProduct (payload) {
      this.produto = Object.assign({}, payload.data)
    },
    processPedido (payload) {
      this.pedidoAuxiliar = Object.assign({}, this.modelPedido)
      this.pedidoAuxiliar.cliente_id = this.editingItem.cliente_id
      this.pedidoAuxiliar.total = payload[1]
      this.pedidoAuxiliar.status = this.statusPedido.substring(0, 1)
      this.pedidoAuxiliar.created_at = this.editingItem.data
      payload[0].forEach(element => {
        this.listaProdutosAuxiliar = Object.assign({}, this.modelListaDeProdutos)
        this.listaProdutosAuxiliar.pedido_id = this.editingItem.id
        this.listaProdutosAuxiliar.produto_id = element.id
        this.listaProdutosAuxiliar.quantidade = element.quantidade
        this.pedidoAuxiliar.lista_de_produtos.push(this.listaProdutosAuxiliar)
      })
      this.updateBD()
      setTimeout(() => {
        location.reload()
      }, 300)
    },
    async updateBD () {
      // update no banco de dados
      const response = await axios.post('http://localhost:8765/pedidos/edit/' + this.editingItem.id, this.pedidoAuxiliar)
      if (response.status === 200) {
        console.log(response.data)
        this.$q.notify('Dados do pedido atualizados')
      } else {
        console.error('Erro no update de pedido')
        this.$q.notify('Erro ao atualizar dados do pedido')
      }
    },
    setStatus () {
      switch (this.statusInicial) {
        case 'A':
          this.statusPedido = 'Aberto'
          break
        case 'E':
          this.statusPedido = 'Entregue'
          break
        case 'C':
          this.statusPedido = 'Cancelado'
          break
        default:
          this.statusPedido = null
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
  .titulo {
    font-size: 2.3em
  }
  .produtos-pedido{
    width: 60%;
    border: 1px solid transparent;
    background-color: white;
  }
  .catalogo-produtos{
    width: 40%;
    border: 1px solid transparent;
    background-color:white;
  }
  .client-identification{
    border-bottom: 3px dotted gray;
  }
</style>
