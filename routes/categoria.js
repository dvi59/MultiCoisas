const express = require('express')
const router = express.Router()

router.post('/post',((req, res) => {
    req.getConnection((err,conn)=> {
        if (err)
            return res.status(500).send('Internal Server Error')

        const codigo = req.body.codigo
        const nome = req.body.nome

        conn.query('insert into categoria (codigo,nome) values (?,?)',[codigo,nome],(err, rows)=>{
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
        const modificacao = new Date()

        conn.query('update categoria set codigo = ?,nome = ?,data_modificacao = ?  where id = ?',[codigo,nome,modificacao,id], (err, rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            res.status(200).json(rows)
        })
    })
}))



module.exports = router
