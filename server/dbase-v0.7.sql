-- Acicionando Tabela order_items

create table order_items (
	order_id int,
	product_id int, 
	quantity int,
	CONSTRAINT order_items_pk PRIMARY KEY (order_id, product_id),
	CONSTRAINT order_items_order_id_fk FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT order_items_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
);


-- Inserindo registros
insert into order_items(order_id, product_id, quantity) values (5, 100, 10);
insert into order_items(order_id, product_id, quantity) values (5, 101, 5);



-- Relaciona ids dos pedidos, id de cliente e total de pedido (totais nulos inclusos)
select o.id, o.customer_id, o.date, o.status, sum(oi.quantity*p.price) as Total from orders o 
left join order_items oi on oi.order_id = o.id
left join products p on p.id = oi.product_id
left join customers c on c.id = o.customer_id
group by o.id, o.customer_id, c.customer_name, o.status, o.date, oi.order_id
order by oi.order_id