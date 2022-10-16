-- Acicionando Tabela order_items

create table order_items (
	order_id int,
	product_id int, 
	quantity int,
	CONSTRAINT order_items_pk PRIMARY KEY (order_id, product_id),
	CONSTRAINT order_items_order_id_fk FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT order_items_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
);

insert into order_items(order_id, product_id, quantity) values (5, 107, 10);
insert into order_items(order_id, product_id, quantity) values (5, 105, 5);