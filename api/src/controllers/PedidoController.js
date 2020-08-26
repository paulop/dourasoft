const pool = require('../database/pool')


module.exports = {
    
    async index(req, res) {
        const sql = 'SELECT * FROM pedidos ORDER BY status ASC'

        await pool.query(sql, (error, results) => {
            if(error) throw error

            res.status(200).json(results.rows)
        })
    },
    async indexListaItens(req, res) {
        const id = parseInt(req.params.id)
        const sql = 'SELECT * FROM lista_itens WHERE id_pedido = $1' //convert(datetime, date, 103)

        await pool.query(sql, [id], (error, results) => {
            if(error) throw error

            res.status(200).json(results.rows)
        })
    },
    async create(req, res) {
        const {id_cliente, data_pedido, status, total_pedido} = req.body
        const sql = 'INSERT INTO pedidos (id_cliente, data_pedido, status, total_pedido) VALUES ($1, $2, $3, $4)'

        await pool.query(sql, [id_cliente, data_pedido, status, total_pedido], (error, results) => {
            if(error) throw error

            res.status(201).send()
        })
    },
    async createListaItens(req, res) {
        const {id_produto, id_pedido, quantidade_produto, valor_produto, total_lista} = req.body
        const sqlLista = 'INSERT INTO lista_itens (id_pedido, id_produto, quantidade_produto, valor_produto, total_lista) VALUES ($1, $2, $3, $4, $5)'

        pool.query(sqlLista, [id_produto, id_pedido, quantidade_produto, valor_produto, total_lista], (error, results) => {
            if(error) throw error

            res.status(201).send()
        })
    },
    async update(req, res) {
        const id = parseInt(req.params.id) 
        const {id_cliente, data_pedido, status, total_pedido} = req.body
        const sql = 'UPDATE pedidos SET id_cliente = $1, data_pedido = $2, status = $3, total_pedido = $4 WHERE id = $5'
    
        await pool.query(sql, [id_cliente, data_pedido, status, total_pedido, id], (error, results) => {
            if(error) throw error
    
            res.status(200).send()
        })
    },
    async updateListaItens(req, res) {
        const id = parseInt(req.params.id) 
        const {id_pedido, id_produto, quantidade_produto, valor_produto, total_lista} = req.body
        const sql = 'UPDATE lista_itens SET id_pedido = $1, id_produto = $2, quantidade_produto = $3, valor_produto = $4, total_lista = $5 WHERE id = $5'
    
        await pool.query(sql, [id_pedido, id_produto, quantidade_produto, valor_produto, total_lista, id], (error, results) => {
            if(error) throw error
    
            res.status(200).send()
        })
    },
    async delete(req, res) {
        const id = parseInt(req.params.id)

        await pool.query('DELETE FROM pedidos WHERE id = $1', [id], (error, results) => {
            if(error) throw error
    
            res.status(200).send(`User deleted with ID: ${id}`)
        })
    },
    async deleteListaItens(req, res) {
        const id = parseInt(req.params.id)

        await pool.query('DELETE FROM lista_itens WHERE id = $1', [id], (error, results) => {
            if(error) throw error
    
            res.status(200).send(`Lista de itens deleted with ID: ${id}`)
        })
    },
}