
exports.up = function(knex) {
    return knex.schema.createTable('pedido', function(table) {
        table.increments('id_pedido')
        table.string('status', 12).notNullable()
        table.date('data_pedido').notNullable()
        table.float('total').notNullable()
        table.integer('id_cliente_pedido').references('cliente.id_cliente').notNullable().onDelete("CASCADE")
      
        table.timestamp('created_at').defaultTo(knex.fn.now()) //momento de criração
        table.timestamp('updated_at').defaultTo(knex.fn.now()) //momento de quando for modificado
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('pedido')
};
  