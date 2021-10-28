const express = require('express')
const {resetWatchers} = require("nodemon/lib/monitor/watch");
const router = express.Router()

router.get('/get',((req, res) => {
    req.getConnection((err,conn)=>{
        if(err)
            return res.status(500).send('Internal Server Error')

        conn.query('select * from venda',(err, rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            res.status(200).json(rows)
        })
    })
}))

router.post('/post',((req, res) => {
    req.getConnection((err,conn)=> {
        if (err)
            return res.status(500).send('Internal Server Error')

        const codigo = req.body.codigo
        const valor = req.body.valor
        const data_venda = req.body.data_venda
        const clienteid = req.body.clienteid


        conn.query('insert into venda(codigo,valor,data_venda,clienteid) values (?,?,?,?)',[codigo,valor,data_venda,clienteid],(err, rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            res.status(200).json(rows)
        })
    })
}))

router.put('/put',((req, res) => {
    req.getConnection((err,conn)=> {
        if (err)
            return res.status(500).send('Internal Server Error')

        const id = req.body.id
        const codigo = req.body.codigo
        const valor = req.body.valor
        const data_venda = req.body.data_venda
        const clienteid = req.body.clienteid
        const modificacao = new Date()

        conn.query('update venda set  codigo = ?, valor = ? ,data_venda = ? ,clienteid = ?,  data_modificacao = ?  where id = ?',[codigo,valor,data_venda,clienteid,modificacao,id], (err, rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            res.status(200).json(rows)
        })
    })
}))













module.exports = router
