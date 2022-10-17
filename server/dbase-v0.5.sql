-- Reference SQL script file

-- ElephantSQL PostgreSQL Database

-- Nome da base de dados (Cloud)): mgjjxcsj

create table products (
	id serial primary key,
	cod_prod int not null,
	prod_name varchar(64) not null,
	description varchar(128),
	price numeric
);

insert into products (cod_prod, prod_name, description, price) values (100, 'notebook A', 'note core i9 3.2ghz 32gb', 4850.00);
insert into products (cod_prod, prod_name, description, price) values (101, 'desktop B', 'desktop core i5 1.8ghz 16gb', 2750.00);
insert into products (cod_prod, prod_name, description, price) values (102, 'teclado warrior rgb', 'teclado ergonomico rgb', 79.90);
insert into products (cod_prod, prod_name, description, price) values (103, 'mouse gamer 7 botoes corsair', 'mouse gamer 7 botoes corsair', 129.90);
insert into products (cod_prod, prod_name, description, price) values (104, 'monitor AOC 32" tela curva', 'monitor AOC 32" tela curva', 729.90);
insert into products (cod_prod, prod_name, description, price) values (105, 'thin client lenovo i5', 'thin client lenovo i5', 649.90);
insert into products (cod_prod, prod_name, description, price) values (106, 'cabo hdmi 6m', 'cabo hdmi 6m', 99.90);
insert into products (cod_prod, prod_name, description, price) values (107, 'hd externo samsung 1tb', 'hd externo samsung 1tb', 229.90);
