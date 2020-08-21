exports.up = function(knex) {
    return knex.schema.createTable('pedidos', function(table){
        table.string('id').primary();
        table.integer('cliente').notNullable();
        table.string('total').notNullable();
        table.string('data').notNullable();
        table.string('status').notNullable();
    
        table.foreign('cliente').references('id').inTable('clientes');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};
