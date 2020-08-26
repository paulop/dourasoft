const pool = require('../database/pool')


module.exports = {
    
    async index(req, res) {
        const sql = 'SELECT * FROM produtos ORDER BY nome ASC'

        await pool.query(sql, (error, results) => {
            if(error) throw error

            res.status(200).json(results.rows)
        })
    },
    async create(req, res) {
        const {codigo, nome, descricao, preco} = req.body
        const sql = 'INSERT INTO produtos (codigo, nome, descricao, preco) VALUES ($1, $2, $3, $4)'

        await pool.query(sql, [codigo, nome, descricao, preco], (error, results) => {
            if(error) throw error
    
            res.status(201).send()
        })
    },
    async update(req, res) {
        const id = parseInt(req.params.id) 
        const {codigo, nome, descricao, preco} = req.body
        const sql = 'UPDATE produtos SET codigo = $1, nome = $2, descricao = $3, preco = $4 WHERE id = $5'
    
        await pool.query(sql, [codigo, nome, descricao, preco, id], (error, results) => {
            if(error) throw error
    
            res.status(200).send()
        })
    },
    async delete(req, res) {
        const id = parseInt(req.params.id)

        await pool.query('DELETE FROM produtos WHERE id = $1', [id], (error, results) => {
            if(error) throw error
    
            res.status(200).send(`User deleted with ID: ${id}`)
        })
    }

}