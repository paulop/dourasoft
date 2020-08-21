const connection = require('../database/connection');

module.exports = {
    async cadastro(req, res){
        try {
            const { nome, telefone, endereco } = req.body;

            const cliente = await connection('clientes')
            .where('nome', nome)
            .select('*')
            .first();

            if(!cliente){
                await connection('clientes').insert({
                    nome,
                    telefone,
                    endereco
                });

                return res.status(200).send({message: 'Cliente cadastrado'});
            }else{
                return res.status(400).send({ message: 'Cliente ja cadastrado' });
            }
        
        } catch (error) {
            return res.status(400).send(error);
        }   
    },

    async editar(req, res){
        const {id} = req.params
        const { telefone, endereco } = req.body;

        try {
            
            await connection('clientes')
                .where('id', id)
                .update({
                    telefone,
                    endereco
                });

            return res.status(200).send({ message: 'Imformações atualizadas com sucesso' });
        } catch (error) {
            console.log(error);
            return res.send(400).send({ message: 'Algo de errado' });
        }
    },

    async clientes(req, res){
        try {
            const clientes = await connection('clientes')
            .select('*');

            return res.json(clientes);
        } catch (error) {
            console.log(error);
            return res.json({ message: 'Algo de errado com a listagem dos clientes' });
        }

    },      

    async deletar(req, res){
        const { id } = req.params;

        try {
            
            const cliente = await connection('clientes')
            .where('id', id)
            .select('*')
            .first();

        if(cliente){
            await connection('clientes')
                .where('id', id)
                .delete();   
            
            return res.status(200).send({ message: 'Cliente deletado com sucesso'});
        }else{
            return res.status(400).send({ message: 'cliente não cadastrado' });
        }

        } catch (error) {
            console.log(error);

            return res.status(400).send({ error: 'Algo errado' });
        }
    }
}