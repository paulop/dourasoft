const knex = require('../database')

module.exports = {
    async index(req, res, next) {
        try {
            const {id_cliente_pedido} = req.params
            const data = await knex('pedido')

            if(id_cliente_pedido){
                data.where({id_cliente_pedido}).join('cliente', 'cliente.id_cliente', '=', 'pedido.id_cliente_pedido').select('pedido.*', 'cliente.nome_cliente')
            }

            return res.json(data)
        }catch(error) {
            next(error)
        }
    },
    async create(req, res, next) {
        try{
            const {status, data_pedido, total, id_cliente_pedido} =  req.body    
            await knex('pedido').insert({
                status,
                data_pedido,
                total,
                id_cliente_pedido
            })

            return res.status(201).send()
        }catch(error) {
            next(error)
        }
    },
    async update(req, res, next) {
        try {
            const {status, data_pedido, total, id_cliente_pedido} =  req.body 
            const {id_pedido} = req.params

            await knex('pedido')
                .update({status, data_pedido, total, id_cliente_pedido})
                .where({id_pedido} )

            return res.status(200).send()
        } catch(error) {
            next(error)
        }
    }, 
    async delete(req, res, next) {
        try{
            const {id_pedido} = req.params

            await knex('pedido').where({id_pedido}).del()

            return res.status(200).send()
        }catch(error) {
            next(error)
        }
    }
}
