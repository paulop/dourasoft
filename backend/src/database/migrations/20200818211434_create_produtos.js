
exports.up = function(knex) {
    return knex.schema.createTable('produto', function(table) {
        table.increments('id_produto')
        table.string('nome_produto', 60).unique().notNullable()
        table.string('desc_produto').notNullable() //tamanho 255
        table.float('preco_produto').notNullable()
        table.specificType('codigo_produto', 'char(10)').notNullable()
      
        table.timestamp('created_at').defaultTo(knex.fn.now()) //momento de criração
        table.timestamp('updated_at').defaultTo(knex.fn.now()) //momento de quando for modificado
    })
  };
  
exports.down = function(knex) {
return knex.schema.dropTable('produto')
};
  