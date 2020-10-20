const {Produto} = require("../models");

// Validação em Middleware
exports.getProduto = async (req, res, next) => {
    try {
        const id = req.params.id;
        const produto = await Produto.findByPk(id);
        if (!produto)
            return res.status(404).send({message: "Produto não Encontrado"})
        res.produto = produto;
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
    next();
};

exports.findAll = async (req, res) => {
    try {
        res.json(await Produto.findAll({order: [["id", "DESC"]]}));
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.retrieve = (req, res) => {
    res.json(res.produto);
};

exports.create = async (req, res) => {
    const body = req.body;

    if (!body.nome || !body.nome.trim())
        res.status(400).json({message: "Produto Inválido, Nome Inválido"});
    else if (!body.codigo || !body.codigo.trim())
        res.status(400).json({message: "Produto Inválido, Código Inválido"});
    else if (!body.preco && body.preco !== 0)
        res.status(400).json({message: "Produto Inválido, Preço Inválido"});
    else {
        const produto = await Produto.create({
            nome: body.nome,
            codigo: body.codigo,
            preco: body.preco,
            descricao: body.descricao
        });
        res.status(201).json(produto);
    }
};

exports.update = async (req, res) => {
    const body = req.body;
    try {
        const produto = res.produto;
        if (body.nome && body.nome.trim())
            produto.nome = body.nome;
        if (body.codigo && body.codigo.trim())
            produto.codigo = body.codigo;
        if (body.preco || body.preco === 0)
            produto.preco = body.preco;
        if(body.descricao && body.descricao.trim())
            produto.descricao = body.descricao
        await produto.save();
        res.json(produto);
    } catch (error) {
        res.status(400).json({message: error.message})
    }

};

exports.delete = async (req, res) => {
    const produto = res.produto;
    try {
        await produto.destroy();
        res.json({message: "Produto Removido"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
