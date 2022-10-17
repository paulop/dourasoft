-- Adicionando Tabela customers (clientes)

-- Adicionando Tabela orders (pedidos)

create table customers(
	id serial primary key,
	customer_name varchar(100) not null,
	phone varchar(11),
	addr VARCHAR(128)
);

insert into customers (customer_name, phone, addr) values ('Anderson Silva', '67992005515', 'Rua das Acácias, 250 - Jd Vida - Corumbá - MS');
insert into customers (customer_name, phone, addr) values ('Ana Petelin', '67984192225', 'Rua Monte Castelo, 101 - Jd Chaplin - Dourados - MS');
insert into customers (customer_name, phone, addr) values ('Clara Simat', '11992921100', 'Rua Shaman 1230, - Alphaville - São Paulo - SP');
insert into customers (customer_name, phone, addr) values ('Douglas Koerich', '65992505001', 'Rua da Madeira, 121 - Shangri-la - Cuiaba - MT');
insert into customers (customer_name, phone, addr) values ('Melissa Krueger', '67998001551', 'Rua da Pedreira, 2020 - Pq Alvorada - Dourados - MS');
insert into customers (customer_name, phone, addr) values ('Alceu Dispor', '67999571281', 'Rua Projetada 8, 17 - Jd. Florida - Dourados - MS');


create table orders (
	id serial primary key,
	customer_id int,
	date date,
	status varchar(20),
	foreign key (customer_id) references customers(id)
);


insert into orders(customer_id, date, status) values (1, '2022-5-9', 'Aberto');
insert into orders(customer_id, date, status) values (3, '2022-8-17', 'Aberto');
insert into orders(customer_id, date, status) values (4, '2022-9-23', 'Aberto');