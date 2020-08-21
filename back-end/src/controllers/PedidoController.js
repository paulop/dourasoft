const connection = require('../database/connection');
const crypto = require('crypto');
const { produto } = require('./ProdutosController');

module.exports = {
    async cadastro(req, res){
        try {
            const { id } = req.params;
            const idPedido = crypto.randomBytes(4).toString('HEX');
            const date = new Date;
            const data = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

            await connection('pedidos').insert({
                id:idPedido,
                cliente:id,
                total:0,
                data,
                status:'Aberto'
            });
            return res.status(200).send({ idPedido, data});

        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'algo errado' });
        }
    },

    async AdicionarProduto(req, res){
        try {
            const { id } = req.params;
            const { quantidade, produto, status } = req.body;
            const produtos = await connection('produtos')
                .where('id', produto)
                .select('*')
                .first();
            const pedido = await connection('pedidos')
                .where('id', id)
                .select('total')
                .first();
            const valorUnitario = (+produtos.preco);
            const valorTotal = (+produtos.preco * quantidade);
            const total = valorTotal + (+pedido.total);

            await connection('listaPedido').insert({
                quantidade,
                produto,
                valorUnitario,
                valorTotal,
                IdPedido:id
            });

            await connection('pedidos')
                .where('id', id)
                .update({
                    total,
                    status
                });

            return res.status(200).send({ quantidade, produto, valorUnitario, valorTotal, id });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'error' })
        }
    },


    async pedidos(req, res){
        try {
            
            let pedido = await connection.select('pedidos.id', 'pedidos.cliente', 'pedidos.total', 'pedidos.data', 'pedidos.status',
            'listaPedido.produto').from('pedidos')
            .rightJoin('listaPedido', 'pedidos.id', 'listaPedido.IdPedido');
            
            var pedidos = new Array();
            for (let index = 0; index < pedido.length; index++) {
                if( (pedidos.length == 0) || (pedidos[(pedidos.length)-1].id != pedido[index].id)){
                    const clienteId = pedido[index].cliente;
                    const clientes = await connection('clientes')
                        .where('id', clienteId)
                        .select('nome');
                    
                    const produtoId = pedido[index].produto;
                    const produtos = await connection('produtos')
                        .where('id', produtoId)
                        .select('nome');
                    let produto = new Array();
                    produto.push(produtos[0].nome);

                    const consulta={
                        id:pedido[index].id,
                        cliente:clientes[0].nome,
                        total:pedido[index].total,
                        data:pedido[index].data,
                        status:pedido[index].status,
                        produto
                    }

                    pedidos.push(consulta);   
                }else
                if(pedidos[(pedidos.length)-1].id == pedido[index].id){
                    const produtoId = pedido[index].produto;
                    const produtos = await connection('produtos')
                        .where('id', produtoId)
                        .select('nome');

                    const produto = produtos[0].nome;

                    pedidos[(pedidos.length)-1].produto.push(produto);
                }
            }

                res.status(200).send(pedidos);
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'Algo de errado' });
        }
    },

    async produtoPedido(req, res){
        const { id } = req.params;

        try {
            const pedido = await connection('pedidos')
                .where('id', id)
                .select('*')
                .first();
            const produto = await connection('listaPedido')
                .where('IdPedido', id)
                .select('*');
            var produtos = new Array();
            let produtoPedido;
            const tamanho = produto.length;
            for (let index = 0; index < tamanho; index++) {
                let idProduto = produto[index].produto;
                const nome = await connection('produtos')
                    .where('id', idProduto)
                    .select('nome')
                    .first();
                const nomes = nome.nome;
                produtoPedido = {
                    id:produto[index].id,
                    quantidade:produto[index].quantidade,
                    produto:nomes
                }
                    produtos.push(produtoPedido);
                
            }
                
            return res.status(200).send(produtos);
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'Algo de errado' });
        }
    },

    async deletarProdutoLista(req, res){
        const { id } = req.params;

        try {
            
            const produto = await connection('listaPedido')
                .where('id', id)
                .select('*')
                .first();
            const IdPedido = produto.IdPedido;

            const pedido = await connection('pedidos')
                .where('id', IdPedido)
                .select('total')
                .first();
                
            const valorTotal = +(produto.valorTotal);
            const atual = +(pedido.total);
            const total = valorTotal - atual;
            
            if(produto){
                await connection('listaPedido')
                    .where('id', id)
                    .delete();

                await connection('pedidos')
                    .where('id', IdPedido)
                    .update({
                        total
                    });
                return res.status(200).send({ message: 'Produto deletado com sucesso'});  
            }else{
                return res.status(400).send({ message: 'Produto não cadastrado' });
            }

        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'Algo errado' });
        }
    }, 

    async deletarPedido(req, res){
        const { id } = req.params;

        try {
            const listaPedido = await connection('listaPedido')
            .where('IdPedido', id)
            .select('id');
            
            for (let i = 0; i < listaPedido.length; i++) {
                let IdLista = listaPedido[i].id;

                await connection('listaPedido')
                    .where('id', IdLista)
                    .delete();
            }

            await connection('pedidos')
                .where('id', id)
                .delete();
            
            return res.status(200).send({ message: 'Pedido deletado com sucesso'}); 
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'Algo errado' });
        }
    }
}