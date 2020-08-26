const routes = require('./routes')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3333

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(port, () => console.log('Server on'))