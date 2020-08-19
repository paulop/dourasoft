
exports.up = function(knex) {
  return knex.schema.createTable('cliente', function(table) {
      table.increments('id_cliente')
      table.string('nome_cliente', 60).unique().notNullable()
      table.specificType('telefone_cliente', 'char(11)').notNullable()
      table.string('endereco_cliente', 120).notNullable()
    
      table.timestamp('created_at').defaultTo(knex.fn.now()) //momento de criração
      table.timestamp('updated_at').defaultTo(knex.fn.now()) //momento de quando for modificado
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('cliente')
};
