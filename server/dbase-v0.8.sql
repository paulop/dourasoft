-- Acicionando Queries para o Backendr

-- Alteracao na query de busca de pedido, com formatacao apropriada de data e rótulo 'as date'
select o.id, o.customer_id, to_char(o.date, 'YYYY-mm-dd'), o.status, sum(oi.quantity*p.price) as Total from orders o left join order_items oi on oi.order_id = o.id left join products p on p.id = oi.product_id left join customers c on c.id = o.customer_id group by o.id, o.customer_id, c.customer_name, o.status, o.date, oi.order_id order by oi.order_id

