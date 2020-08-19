
exports.up = function(knex) {
    return knex.schema.createTable('produto_pedido', function(table) {
        table.increments('id_produto_pedido')
        table.string('produto').notNullable()
        table.integer('quantidade').notNullable()
        table.float('valor_unitario').notNullable()
        table.float('valor_total').notNullable()
        table.integer('id_cliente').references('cliente.id_cliente').notNullable()
        table.integer('id_pedido').references('pedido.id_pedido').notNullable().onDelete("CASCADE")
      
        table.timestamp('created_at').defaultTo(knex.fn.now()) //momento de criração
        table.timestamp('updated_at').defaultTo(knex.fn.now()) //momento de quando for modificado
    })
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('produto_pedido')
};
  