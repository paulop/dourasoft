const {Cliente} = require("../models");

// Validação em Middleware
exports.getCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        if (!cliente)
            return res.status(404).send({message: "Cliente não Encontrado"})
        res.cliente = cliente;
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
    next();
};

exports.findAll = async (req, res) => {
    try {
        res.json(await Cliente.findAll({order: [["id", "DESC"]]}));
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.retrieve = (req, res) => {
    res.json(res.cliente);
};

exports.create = async (req, res) => {
    const {nome, endereco, telefone} = req.body;

    if (!nome || !nome.trim())
        res.status(400).json({message: "Cliente Inválido, Nome Inválido"});
    else if (!endereco || !endereco.trim())
        res.status(400).json({message: "Cliente Inválido, Endereço Inválido"});
    else {
        try {
            const cliente = await Cliente.create({
                nome,
                endereco,
                telefone
            });
            res.status(201).json(cliente);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
};

exports.update = async (req, res) => {
    const {nome, endereco, telefone} = req.body;
    try {
        const cliente = res.cliente;
        if (nome && nome.trim())
            cliente.nome = nome;
        if (endereco && endereco.trim())
            cliente.endereco = endereco;
        if (telefone && telefone.trim())
            cliente.telefone = telefone;
        res.json(await cliente.save());
    } catch (error) {
        res.status(400).json({message: error.message});
    }

};

exports.delete = async (req, res) => {
    const cliente = res.cliente;
    try {
        await cliente.destroy();
        res.json({message: "Cliente Removido"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
