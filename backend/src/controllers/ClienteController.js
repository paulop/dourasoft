const knex = require("../database")

module.exports = {
    async index(req, res) {
        const data = await knex('cliente')

        return res.json(data)
    },
    async create(req, res, next) {
        try{
            const {nome_cliente, telefone_cliente, endereco_cliente} =  req.body    
            await knex('cliente').insert({
                nome_cliente,
                telefone_cliente,
                endereco_cliente
            })

            return res.status(201).send()
        }catch(error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const {nome_cliente, telefone_cliente, endereco_cliente} = req.body
            const {id_cliente} = req.params

            await knex('cliente')
                .update({nome_cliente, telefone_cliente, endereco_cliente})
                .where({id_cliente})

            return res.status(200).send()
        } catch(error) {
            next(error)
        }
    }, 
    async delete(req, res, next) {
        try{
            const {id_cliente} = req.params

            await knex('cliente').where({id_cliente}).del()

            return res.status(200).send()
        }catch(error) {
            next(error)
        }
    }
}