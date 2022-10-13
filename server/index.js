// criando e ativando o express
const express = require("express");
const app = express();
// cross origin resource sharing
const cors = require("cors");
// with this pool, we can run queries with postgres
const pool = require("./db");
// definicao de porta
const PORT = 3001;

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
            const allRegs = await pool.query("SELECT * FROM products");
            //console.log(allRegs);
            res.send(allRegs);
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

// delete a register

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
            const allRegs = await pool.query("SELECT * FROM customers");
            //console.log(allRegs);
            res.send(allRegs);
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
        const {customer_id, date, status, total} = req.body;
        console.log(req.body)
        const results = await pool.query(
            "INSERT INTO orders (customer_id, date, status, total) VALUES ($1, $2, $3, $4) returning *", [ customer_id, date, status, total]
        );
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
            const allRegs = await pool.query("SELECT * FROM orders");
            //console.log(allRegs);
            res.send(allRegs);
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
        const oneReg = await pool.query("UPDATE orders SET customer_id=$1, date=$2, status = $3, total = $4 WHERE id = $5", [customer_id, date, status, total, id]);
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
