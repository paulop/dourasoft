const {Pedido, Cliente, sequelize} = require("../models");
const {createProdutosPedido, updateProdutosPedido, deleteProdutosPedido, getProdutosPedido} = require("./produtoPedidoController");
const statusList = ['Aberto', 'Entregue', 'Cancelado'];

const completePedidoAttributes = async (pedido, cliente, produtos) => {
    const fullPedido = pedido.dataValues;
    fullPedido.cliente = cliente || await Cliente.findByPk(pedido.clienteId, {raw: true});
    fullPedido.produtos = produtos || await getProdutosPedido(pedido.id)
    delete fullPedido.clienteId;
    return pedido;
}

// Validação em Middleware
exports.getPedido = async (req, res, next) => {
    try {
        const id = req.params.id;
        const pedido = await Pedido.findByPk(id);
        if (!pedido)
            return res.status(404).send({message: "Pedido não Encontrado"})
        res.pedido = pedido;
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
    next();
};

exports.findAll = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: Cliente,
            attributes: {exclude: ["clienteId"]},
            order: [["id", "DESC"]]
        });
        res.status(206).json(pedidos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.retrieve = async (req, res) => res.json(await completePedidoAttributes(res.pedido));

exports.create = async (req, res) => {
    const body = req.body;
    if (!body.clienteId)
        res.status(400).json({message: "Pedido Inválido, Requer id do Cliente"});
    else {
        const cliente = await Cliente.findByPk(body.clienteId, {raw: true})
        let status = "Aberto";
        if (body.status) {
            if (statusList.indexOf(body.status) < 0) {
                res.status(400).json({message: "Pedido Inválido, Status Informado não é Conhecido"});
                return;
            } else
                status = body.status;
        }
        if (!cliente)
            res.status(400).json({message: "Pedido Inválido, Cliente não Encontrado"});
        else
            try {
                const pedido = await sequelize.transaction(async (transaction) => {
                    const pedido_partial = await Pedido.create({
                        clienteId: body.clienteId,
                        status,
                        valorTotal: 0.0
                    }, {transaction});
                    const {produtos, total} = await createProdutosPedido(pedido_partial.id, body.produtos, transaction);
                    pedido_partial.valorTotal = total;
                    return await completePedidoAttributes(await pedido_partial.save({transaction}), cliente, produtos);
                });
                res.status(201).json(pedido);
            } catch (error) {
                res.status(500).json({message: error.message})
            }
    }
};

exports.update = async (req, res) => {
    const body = req.body;
    try {
        const pedido = res.pedido;
        const updatedPedido = await sequelize.transaction(async transaction => {
            if (body.status) {
                if (statusList.indexOf(body.status) > -1)
                    pedido.status = body.status;
                else
                    throw new Error("Pedido Inválido, Status Inválido");
            }
            if (body.clienteId) {
                const cliente = await Cliente.findByPk(body.clienteId, {raw: true})
                if (!cliente)
                    throw new Error("Cliente não Encontrado");
                else
                    pedido.clienteId = cliente.id;
            }
            if (body.produtos) {
                const {produtos, total} = await updateProdutosPedido(pedido.id, body.produtos, transaction);
                pedido.valorTotal = total;
                return await completePedidoAttributes(await pedido.save({transaction}), undefined, produtos);
            }
            return await completePedidoAttributes(await pedido.save({transaction}));
        });
        res.json(updatedPedido);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.delete = async (req, res) => {
    const pedido = res.pedido;
    try {
        await sequelize.transaction(async transaction => {
            await deleteProdutosPedido(pedido.id, transaction);
            await pedido.destroy({transaction});
        });
        res.json({message: "Pedido Removido"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
