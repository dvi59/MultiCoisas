const express = require('express')
const router = express.Router()

router.get('/get',((req, res) => {
    req.getConnection((err,conn)=>{
        if(err)
            return res.status(500).send('Internal Server Error')

        conn.query('select * from cliente',(err, rows)=>{
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
        const nome = req.body.nome
        const data_nasc = req.body.data_nasc
        const email = req.body.email


        conn.query('insert into cliente(codigo,nome,data_nasc,email) values (?,?,?,?)',[codigo,nome,data_nasc,email],(err, rows)=>{
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
        const nome = req.body.nome
        const email = req.body.email
        const modificacao = new Date()

        conn.query('update cliente set  codigo = ?, nome = ? ,email = ? ,  data_modificacao = ?  where id = ?',[codigo,nome,email,modificacao,id], (err, rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            res.status(200).json(rows)
        })
    })
}))




module.exports = router
