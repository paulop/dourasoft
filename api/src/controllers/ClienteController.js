const pool = require('../database/pool')


module.exports = {
    
    async index(req, res) {
        const sql = 'SELECT * FROM clientes ORDER BY nome ASC'

        await pool.query(sql, (error, results) => {
            if(error) throw error

            res.status(200).json(results.rows)
        })
    },
    async indexById(req, res) {
        const nome = req.params.nome
        const sql = 'SELECT * FROM clientes WHERE nome = $1'

        await pool.query(sql, [nome],(error, results) => {
            if(error) throw error
            if(results.rows == "") res.status(404)
            res.status(200).json(results.rows)
        })
    },
    async create(req, res) {
        const {nome, telefone, endereco} = req.body
        const sql = 'INSERT INTO clientes (nome, telefone, endereco) VALUES ($1, $2, $3)'

        await pool.query(sql, [nome, telefone, endereco], (error, results) => {
            if(error) throw error
    
            res.status(201).send()
        })
    },
    async update(req, res) {
        const id = parseInt(req.params.id) 
        const {nome, telefone, endereco} = req.body
        const sql = 'UPDATE clientes SET nome = $1, telefone = $2, endereco = $3 WHERE id = $4'
    
        await pool.query(sql, [nome, telefone, endereco, id], (error, results) => {
            if(error) throw error
    
            res.status(200).send()
        })
    },
    async delete(req, res) {
        const id = parseInt(req.params.id)

        await pool.query('DELETE FROM clientes WHERE id = $1', [id], (error, results) => {
            if(error) throw error
    
            res.status(200).send(`User deleted with ID: ${id}`)
        })
    }

}