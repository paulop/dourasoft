// criando e ativando o express
require('dotenv').config()

const express = require("express");
const app = express();
// cross origin resource sharing
const cors = require("cors");
// with this pool, we can run queries with postgres
const pool = require("./db");
// definicao de porta
const PORT = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(express.json());

// monitorar porta e msg de conexao 
app.listen(PORT, () => {
    console.log("Servidor iniciado porta: " + PORT);

});

// ROUTES 

// PRODUCT ROUTES

// create product register

app.post("/api/v1/register", async (req,res) => {
    try {
        const {cod_prod, prod_name, description, price} = req.body;
        const results = await pool.query(
            "INSERT INTO products (cod_prod, prod_name, description, price) VALUES ($1, $2, $3, $4) returning *", [ cod_prod, prod_name, description, price]
        );
        console.log(results.rows);
        res.send(results.rows)
    }
    catch (err) {
        console.error(err.message);
    }

});

// read all product registers

    app.get("/api/v1/regs", async (req,res) => {
        try {
            const allRegs = await pool.query("SELECT * FROM products ORDER BY id");
            //console.log(allRegs.rows);
            res.send(allRegs.rows);
        } catch (err) {
            console.error(err.message)
        }

    });

// read one specific product register *DETAIL: for now i needed to use POST,  since GET doesn't allow BODY

app.post("/api/v1/regs/spec", async (req,res) => {
    const {id} = req.params;
    const {prod_name} = req.body;
    try {
        //const oneRegs = await pool.query('SELECT * FROM products p WHERE p.prod_name =$1',[prod_name]);
        const oneRegs = await pool.query(`SELECT * FROM products p WHERE p.prod_name ILIKE '%${prod_name}%'`);
        //res.send(allRegs);
        console.log(oneRegs.rows);
        res.send(oneRegs.rows)
    } catch (err) {
        console.error(err.message)
    }

});


// update one product register

app.put("/api/v1/regs/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {cod_prod, prod_name, description, price } = req.body;
        console.log(req.body)
        const oneReg = await pool.query("UPDATE products SET cod_prod=$1, prod_name=$2, description = $3, price=$4 WHERE id = $5", [cod_prod, prod_name, description, price, id]);
        console.log(oneReg);
        res.send("Entry was updated!");

    } catch (err) {
        console.error(err.message)
    }

});

// delete a product register

app.delete("/api/v1/regs/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteReg= await pool.query("DELETE FROM products WHERE id = $1", [id]);
        //console.log(oneReg);
        res.send("Entry was deleted!");
    } catch (err) {
        console.error(err.message)
    }

});


// CUSTOMER ROUTES

// create customer register

app.post("/customers/api/v1/cust", async (req,res) => {
    try {
        const {customer_name, phone, addr} = req.body;
        console.log(req.body)
        const results = await pool.query(
            "INSERT INTO customers (customer_name, phone, addr) VALUES ($1, $2, $3) returning *", [ customer_name, phone, addr ]
        );
        console.log(results.rows);
        res.send(results.rows)
    }
    catch (err) {
        console.error(err.message);
    }

});

// read all customers registers

    app.get("/customers/api/v1/cust", async (req,res) => {
        try {
            const allRegs = await pool.query("SELECT * FROM customers ORDER BY id");
            //console.log(allRegs);
            res.send(allRegs.rows);
        } catch (err) {
            console.error(err.message)
        }

    });


// read one specific customer register *DETAIL: for now i needed to use POST, since GET doesn't allow BODY

app.post("/customers/api/v1/cust/spec", async (req,res) => {
    const {id} = req.params;
    const {customer_name} = req.body;
    try {
        const oneRegs = await pool.query(`SELECT * FROM customers WHERE customer_name ILIKE '%${customer_name}%'`);
        //res.send(allRegs);
        console.log(oneRegs.rows);
        res.send(oneRegs.rows)
    } catch (err) {
        console.error(err.message)
    }

});


// update one customer register

app.put("/customers/api/v1/cust/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {customer_name, phone, addr} = req.body;
        console.log(req.body)
        const oneReg = await pool.query("UPDATE customers SET customer_name=$1, phone=$2, addr = $3 WHERE id = $4", [customer_name, phone, addr, id]);
        console.log(oneReg);
        res.send("Entry was updated!");

    } catch (err) {
        console.error(err.message)
    }

});

// delete a customer register

app.delete("/customers/api/v1/cust/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteReg= await pool.query("DELETE FROM customers WHERE id = $1", [id]);
        //console.log(oneReg);
        res.send("Entry was deleted!");
    } catch (err) {
        console.error(err.message)
    }

});




// ORDER ROUTES

// create order register

app.post("/orders/api/v1/ord", async (req,res) => {
    try {
        const {customer_id, date} = req.body;
        console.log(req.body)
        const results = await pool.query(
            "INSERT INTO orders (customer_id, date, status) VALUES ($1, $2, $3) returning *", [ customer_id, date, "Aberto"]
        );
        console.log(results.rows);
        res.send(results.rows)
    }
    catch (err) {
        console.error(err.message);
    }

});


// read all order registers WITH DATERANGE FILTER - using POST due to sending a body

app.post("/orders/api/v1/ordate", async (req,res) => {
    try {
        const dateRange = req.body;
        console.log(dateRange.from)
        console.log(dateRange.to)
        const results = await pool.query(
            "select o.id, o.customer_id, to_char(o.date, 'YYYY-mm-dd') as date, o.status, sum(oi.quantity*p.price) as Total from orders o left join order_items oi on oi.order_id = o.id left join products p on p.id = oi.product_id left join customers c on c.id = o.customer_id WHERE o.date BETWEEN $1 and $2 group by o.id, o.customer_id, c.customer_name, o.status, o.date, oi.order_id order by oi.order_id", [ dateRange.from, dateRange.to ]);
        console.log(results.rows);
        res.send(results.rows)
    }
    catch (err) {
        console.error(err.message);
    }

});


// read all order registers

    app.get("/orders/api/v1/ord", async (req,res) => {
        try {
            //const allRegs = await pool.query("SELECT * FROM orders");
            const allRegs = await pool.query("select o.id, o.customer_id, to_char(o.date, 'YYYY-mm-dd') as date, o.status, sum(oi.quantity*p.price) as Total from orders o left join order_items oi on oi.order_id = o.id left join products p on p.id = oi.product_id left join customers c on c.id = o.customer_id group by o.id, o.customer_id, c.customer_name, o.status, o.date, oi.order_id order by oi.order_id");

            //console.log(allRegs);
            res.send(allRegs.rows);
        } catch (err) {
            console.error(err.message)
        }

    });


// update one order register

app.put("/orders/api/v1/ord/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {customer_id, date, status, total} = req.body;
        console.log(req.body)
        const oneReg = await pool.query("UPDATE orders SET customer_id=$1, date=$2, status = $3 WHERE id = $4", [customer_id, date, status, id]);
        console.log(oneReg);
        res.send("Entry was updated!");

    } catch (err) {
        console.error(err.message)
    }

});

// delete a order register

app.delete("/orders/api/v1/ord/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteReg= await pool.query("DELETE FROM orders WHERE id = $1", [id]);
        //console.log(oneReg);
        res.send("Entry was deleted!");
    } catch (err) {
        console.error(err.message)
    }

});


// ORDER ITEMS ROUTES

// read order_detail registers

app.get("/orders/api/v1/ordet/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const allOD = await pool.query("select p.id, p.prod_name, oi.quantity, p.price, (oi.quantity*p.price) as subtotal from order_items oi inner join products p on oi.product_id = p.id WHERE oi.order_id = $1",[id]);
        console.log(allOD.rows);
        res.send(allOD.rows)
    } catch (err) {
        console.error(err.message)
    }

});

// read specific order item (search)
/*
app.get("/orders/api/v1/ordet/:id", async (req,res) => {
    try {
        const allRegs = await pool.query("SELECT * FROM orders");
        //console.log(allRegs);
        res.send(allRegs);
    } catch (err) {
        console.error(err.message)
    }

});
*/

// create-insert order item register (after search)

app.post("/orders/api/v1/ordet", async (req,res) => {
    try {
        const {order_id, product_id, quantity} = req.body;
        console.log(req.body)
        const results = await pool.query(
            "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) returning *", [ order_id, product_id, quantity]
        );
        console.log(results.rows);
        res.send(results.rows)
    }
    catch (err) {
        console.error(err.message);
    }

});


// update one order item register

app.put("/orders/api/v1/ord/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {customer_id, date, status, total} = req.body;
        console.log(req.body)
        const oneReg = await pool.query("UPDATE orders SET customer_id=$1, date=$2, status = $3 WHERE id = $4", [customer_id, date, status, id]);
        console.log(oneReg);
        res.send("Entry was updated!");

    } catch (err) {
        console.error(err.message)
    }

});

// delete a order_item register

app.delete("/orders/api/v1/ordet/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteReg= await pool.query("DELETE FROM order_items WHERE product_id = $1", [id]);
        //console.log(oneReg);
        res.send("Entry was deleted!");
    } catch (err) {
        console.error(err.message)
    }

});