const express = require('express')
const router = express.Router()


router.get('/get',((req, res) => {
    req.getConnection((err,conn)=>{
        if(err)
            return res.status(500).send('Internal Server Error')

        conn.query('select * from produto',(err, rows)=>{
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

        const id = req.body.produtoId
        const codigo = req.body.codigo
        const nome = req.body.nome
        const desc = req.body.descricao
        const categoriaid = req.body.categoriaid
        const modificacao = new Date()

        conn.query('update produto set codigo = ?,nome = ?,descricao = ?, categoriaid = ? ,data_modificacao = ?  where id = ?',[codigo,nome,desc,categoriaid,modificacao,id], (err, rows)=>{
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
        const desc = req.body.descricao
        const categoriaid = req.body.categoriaid

        conn.query('insert into produto (codigo,nome,descricao,categoriaid) values (?,?,?,?)',[codigo,nome,desc,categoriaid],(err, rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            res.status(200).json(rows)
        })
    })
}))

router.delete('/delete',((req, res) => {
    req.getConnection((err,conn)=> {
        if (err)
            return res.status(500).send('Internal Server Error')
        const id = req.body.id
        conn.query('delete from produto where id = ?',[id],(err, rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            res.status(200).json(rows)
        })
    })
}))


module.exports = router
