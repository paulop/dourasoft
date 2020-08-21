const connection = require('../database/connection');

module.exports = {
    async cadastro(req, res){
        try {
            const { codigo, nome, descricao, preco } = req.body;

            const produto = await connection('produtos')
                .where('codigo', codigo)
                .select('*')
                .first();

            if(produto){
                return res.status(400).send({ error: 'Produto já cadastrado' });
            }else{
                await connection('produtos').insert({
                    codigo,
                    nome,
                    descricao,
                    preco
                });
                return res.status(200).send({ message: 'Produto cadastrado com sucesso' });   
            }
            
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'Algo deu errado no cadastro' });
        }
    },

    async editar(req, res){
        try {
            const { codigo, descricao, preco } = req.body;
            const { id } = req.params;

            await connection('produtos')
                .where('id', id)
                .update({
                    codigo,
                    descricao,
                    preco
                });
            
            return res.status(200).send({ message: 'Produto atualizado' });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'Algo de errado na atualização' });
        }
    },

    async produtos(req, res){
        try {
            const produtos = await connection('produtos')
            .select('*');

            return res.json(produtos);
        } catch (error) {
            console.log(error);
            return res.json({ message: 'Algo de errado com a listagem dos produtos' });
        }

    },   
    
    async deletar(req, res){
        const { id } = req.params;

        try {
            
            const produtos = await connection('produtos')
            .where('id', id)
            .select('*')
            .first();

        if(produtos){
            await connection('produtos')
                .where('id', id)
                .delete();   
            
            return res.status(200).send({ message: 'Produto deletado com sucesso'});
        }else{
            return res.status(400).send({ message: 'Produto não cadastrado' });
        }
        } catch (error) {
            console.log(error);

            return res.status(400).send({ error: 'Algo errado' });
        }
    },

    async produto(req, res){
        try {
            const { id } = req.params;

            const produto = await connection('produtos')
                .where('id', id)
                .select('*')
                .first();

            if(produto){
                return res.status(200).send(produto);
            }else{
                return res.status(400).send({ message: 'Produto não cadastrado' });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ message: 'Algo errado' });
        }
    }

    
} 