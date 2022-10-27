-- Busca de faturamento mensal para determinado ano
select
EXTRACT(MONTH from orders.date) as Mes,
sum(order_items.quantity*products.price) as Total 
from orders, order_items, products
where orders.id = order_items.order_id AND
orders.date BETWEEN '2022-01-01' and '2022-12-31'
group by Mes
Order by Mes


-- Obtem o mesmo resultado encontrado acima
select
EXTRACT(MONTH from orders.date) as Mes,
sum(order_items.quantity*products.price) as Total 
from orders, order_items, products
where orders.id = order_items.order_id AND
EXTRACT(YEAR from orders.date) = 2022
group by Mes
Order by Mes