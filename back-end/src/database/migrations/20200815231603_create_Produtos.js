exports.up = function(knex) {
  return knex.schema.createTable('produtos', function(table){
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('codigo').notNullable();
      table.string('descricao').notNullable();
      table.string('preco').notNullable();
  })
};

exports.down = function(knex) { 
    return knex.schema.dropTable('produtos');
};
