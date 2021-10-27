const express = require('express')
const mysql = require('mysql')
const myConnection = require('express-myconnection')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.use(myConnection(mysql, {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}))

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cliente = require('./routes/cliente')
app.use('/cliente', cliente)
const categoria = require('./routes/categoria')
app.use('/categoria', categoria)
const estoque = require('./routes/estoque')
app.use('/estoque', estoque)
const venda = require('./routes/venda')
app.use('/venda', venda)
const produto = require('./routes/produto')
app.use('/produto', produto)


app.listen(9000,()=>{
    console.log("SERVER STARTED");
    console.log("RUNNING IN URL http://localhost:9000");
})
