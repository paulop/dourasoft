// criando e ativando o express
const express = require("express");
const app = express();
// with this pool, we can run queries with postgres
const pool = require("./db");
// definicao de porta
const PORT = 3000;

// middlewares
app.use(express.json());

// monitorar porta e msg de conexao 
app.listen(PORT, () => {
    console.log("Servidor iniciado porta: " + PORT);

});


// ROUTES 


// index


// create register

app.post("/api/v1/register", async(req,res) => {
    try {
        //const {description} = req.body;
        //const cod_prod = 101;
        //const prod_name = 'notebook A';
        //const desc = 'note core i9 3.8ghz 32gb';
        //const price = 750.00;
        //const newReg = await pool.query(
        //    "insert into products (cod_prod, prod_name, description, price) values ($1, $2, $3, $4)", [cod_prod, prod_name, desc, price]
        //);
        //res.send("Entry added!");

        const {cod_prod, prod_name, description, price} = req.body;
        const newReg = await pool.query(
            "INSERT INTO products (cod_prod, prod_name, description, price) VALUES ($1, $2, $3, $4)", [cod_prod, prod_name, description, price]
        );
        console.log("Entry added!");
    }
    catch (err) {
        console.error(err.message);
    }

});

// read all registers

    app.get("/api/v1/regs", async (req,res) => {
        try {
            const allRegs = await pool.query("SELECT * FROM products");
            //console.log(allRegs);
            res.send(allRegs);
        } catch (err) {
            console.error(err.message)
        }

    });


// read one register

app.get("/api/v1/regs/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const oneReg = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        //console.log(oneReg);
        res.send(oneReg);
    } catch (err) {
        console.error(err.message)
    }

});

// update one register

app.put("/api/v1/regs/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const oneReg = await pool.query("UPDATE products SET description = $1 WHERE id = $2", [description, id]);
        //console.log(oneReg);
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