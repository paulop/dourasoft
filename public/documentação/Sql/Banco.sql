CREATE DATABASE	sistema_pedido_cliente;

CREATE SEQUENCE increment
  start 2
  increment 2;


CREATE TABLE clientes (
id_cliente SERIAL PRIMARY KEY,
nome_cliente VARCHAR(120),
telefone_cliente VARCHAR(20),
endereco_cliente VARCHAR(150)
);

CREATE TABLE pedidos (
id_pedido SERIAL PRIMARY KEY,
total_pedido real,
data_pedido date,
id_cliente integer,
FOREIGN KEY(id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE produtos (
id_produto SERIAL PRIMARY KEY,
codigo_produto INTEGER,
nome_produto VARCHAR(120),
descricao_produto VARCHAR(300),
preco real
);

CREATE TABLE pedido_produto (
id_pedido_produto SERIAL PRIMARY KEY,
id_pedido INTEGER,
id_produto INTEGER,
FOREIGN KEY(id_pedido) REFERENCES pedidos (id_pedido) ON DELETE CASCADE,
FOREIGN KEY(id_produto) REFERENCES produtos (id_produto)
);

