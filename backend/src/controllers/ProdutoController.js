const knex = require('../database')

module.exports = {
    async index(req, res) {
        const data = await knex('produto')

        return res.json(data)
    },
    async create(req, res, next) {
        try{
            const {nome_produto, desc_produto, preco_produto, codigo_produto} =  req.body    
            await knex('produto').insert({
                nome_produto, 
                desc_produto, 
                preco_produto, 
                codigo_produto
            })

            return res.status(201).send()
        }catch(error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const {nome_produto, desc_produto, preco_produto, codigo_produto} = req.body
            const {id_produto} = req.params

            await knex('produto')
                .update({nome_produto, desc_produto, preco_produto, codigo_produto})
                .where({id_produto})

            return res.status(200).send()
        } catch(error) {
            next(error)
        }
    }, 
    async delete(req, res, next) {
        try{
            const {id_produto} = req.params

            await knex('produto').where({id_produto}).del()

            return res.status(200).send()
        }catch(error) {
            next(error)
        }
    }
}
