exports.up = function(knex) {
    return knex.schema.createTable('listaPedido', function(table){
        table.increments('id').primary();
        table.integer('quantidade').notNullable();
        table.integer('produto').notNullable();
        table.string('valorUnitario').notNullable();
        table.string('valorTotal').notNullable();
        table.string('IdPedido').notNullable();

        table.foreign('IdPedido').references('id').inTable('pedidos');
        table.foreign('produto').references('id').inTable('produtos');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('listaPedido');
};
