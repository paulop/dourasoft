-- Reference SQL script file

create database dbase;

create table products (
	id serial primary key,
	cod_prod int not null,
	prod_name varchar(64) not null,
	description varchar(128),
	price numeric
);

create table customers(
	id serial primary key,
	customer_name varchar(100) not null,
	phone varchar(11),
	addr VARCHAR(128)
);

create table orders (
	id serial primary key,
	idcustomer int not null,
	date date,
	status varchar(16),
	total numeric 

);

