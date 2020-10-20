const {ProdutoPedido, Produto} = require("../models");

const getProdutosPedido = async (pedidoId) => await ProdutoPedido.findAll({
    where: {pedidoId},
    attributes: {exclude: ["pedidoId", "produtoId", "id"], order: [["id", "DESC"]]},
    include: Produto
});

const createProdutosPedido = async (pedidoId, produtosPedido, transaction) => {
    const created = [];
    let total = 0;
    for (produtoPedido of produtosPedido) {
        if (produtoPedido.quantidade > 0 && produtoPedido.produtoId) {
            const produto = await Produto.findByPk(produtoPedido.produtoId);
            if (produto) {
                const produtoPedidoCreated = await ProdutoPedido.create({
                    pedidoId,
                    produtoId:produto.id,
                    valorUnitario: produtoPedido.valorUnitario || produto.preco,
                    quantidade: produtoPedido.quantidade
                }, {transaction});
                created.push({
                    produto,
                    quantidade: produtoPedidoCreated.quantidade,
                    valorUnitario: produtoPedidoCreated.valorUnitario
                });
                total += produtoPedidoCreated.quantidade * produtoPedidoCreated.valorUnitario;
            } else
                throw new Error("Pedido Inválido, Produto não Encontrado")
        } else
            throw new Error("Pedido Inválido, Especificações Inválidas do Produto")
    }
    return {produtos: created, total};
};

const deleteProdutosPedido = async (pedidoId, transaction) => {
    await ProdutoPedido.destroy({where: {pedidoId}, transaction});
};

const updateProdutosPedido = async (pedidoId, produtosPedido, transaction) => {
    await deleteProdutosPedido(pedidoId, transaction);
    return await createProdutosPedido(pedidoId, produtosPedido, transaction);
};

exports.getProdutosPedido = getProdutosPedido;
exports.updateProdutosPedido = updateProdutosPedido;
exports.deleteProdutosPedido = deleteProdutosPedido;
exports.createProdutosPedido = createProdutosPedido;