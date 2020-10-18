<template>
  <div class="q-pa-md">
    <div class="header">
      <div class="titulo">
        Novo Pedido
      </div>
      <div class="search-client">
        <SearchAndNewClient @envia_cliente="setClient"/>
      </div>
    </div>
    <div class="q-pa-md row flex client-identification">
      <div class="">
        <q-chip size="lg" icon="person">
        {{ this.cliente.nome }}
        </q-chip>
      </div>
      <div class="">
        <q-chip size="lg" icon="phone">
          {{ this.cliente.telefone }}
        </q-chip><br/>
      </div>
      <div class="">
        <q-chip size="lg" icon="house">
          {{ this.cliente.endereco }}
        </q-chip>
      </div>
    </div>
    <div class="q-pa-md status-pedido">
      <q-select square style="max-width: 200px" outlined v-model="statusPedido" :options="options" label="Status do Pedido" />
    </div>
    <div class="row">
      <div class="col-md-6 produtos-pedido">
        <OrderProducts :produtonovo='this.produto'  @processPedido="processPedido" @cancel="cancel()"/>
      </div>
      <div class="col-md-6 catalogo-produtos">
        <ProductsCatalog @adiciona_produto="addProduct"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchAndNewClient from 'components/SearchAndNewClient.vue'
import ProductsCatalog from 'components/ProductsCatalog.vue'
import OrderProducts from 'components/OrderProducts.vue'
const axios = require('axios')

export default {
  name: 'OrderComponent',
  data () {
    return {
      cliente: '',
      produto: {},
      modelPedido: {
        cliente_id: '',
        total: '',
        status: '',
        lista_de_produtos: []
      },
      modelListaDeProdutos: {
        produto_id: '',
        quantidade: ''
      },
      pedidoAuxiliar: {},
      listaProdutosAuxiliar: {},
      statusPedido: 'Aberto',
      options: [
        'Aberto', 'Entregue', 'Cancelado']
    }
  },
  watch: {
    statusPedido () {
      this.produto = {}
    }
  },
  components: { SearchAndNewClient, ProductsCatalog, OrderProducts },
  methods: {
    setClient (payload) {
      this.cliente = payload.cliente
    },
    addProduct (payload) {
      this.produto = Object.assign({}, payload.data)
    },
    processPedido (payload) {
      // criar novo produto
      if (this.cliente === '') {
        alert('Selecione um cliente. Campo obrigatório!')
      } else {
        this.pedidoAuxiliar = Object.assign({}, this.modelPedido)
        this.pedidoAuxiliar.cliente_id = this.cliente.id
        this.pedidoAuxiliar.total = payload[1]
        this.pedidoAuxiliar.status = this.statusPedido.substring(0, 1)
        payload[0].forEach(element => {
          this.listaProdutosAuxiliar = Object.assign({}, this.modelListaDeProdutos)
          this.listaProdutosAuxiliar.produto_id = element.id
          this.listaProdutosAuxiliar.quantidade = element.quantidade
          this.pedidoAuxiliar.lista_de_produtos.push(this.listaProdutosAuxiliar)
        })
        // chamada para o método storePedido
        this.storePedido()
        setTimeout(() => {
          this.$router.push('/pedidos')
        }, 300)
      }
    },
    async storePedido () {
      const response = await axios.post('http://localhost:8765/pedidos/add', this.pedidoAuxiliar)
      if (response.status === 200) {
        console.log(response.data)
        this.$q.notify('Criado um novo pedido')
      } else {
        console.error('Erro na criação de novo pedido')
        this.$q.notify('Erro ao criar novo pedido')
      }
    },
    cancel () {
      // quando o usuário clica para cancelar na tela de novo pedido
      this.$router.push('/pedidos')
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
