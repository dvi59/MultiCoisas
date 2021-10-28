const express = require('express')
const router = express.Router()


router.get('/get',((req, res) => {
    req.getConnection((err,conn)=>{
        if(err)
            return res.status(500).send('Internal Server Error')

        conn.query('select * from estoque',(err, rows)=>{
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
        const produtoid = req.body.produtoid
        const quantidade = req.body.quantidade
        const preco = req.body.preco

        conn.query('select * from produto where id = ?',[produtoid],(err,rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            if(rows.length === 0)
                return res.status(400).send('Produto não existe')
            conn.query('insert into estoque(produtoid,quantidade,preco) values (?,?,?)',[produtoid,quantidade,preco],(err, rows)=>{
                if(err)
                    return res.status(500).send('Internal Server Error')
                res.status(200).json(rows)
            })
        })
    })
}))



router.put('/put',((req, res) => {
    req.getConnection((err,conn)=> {
        if (err)
            return res.status(500).send('Internal Server Error')

        const id = req.body.produtoid
        const quantidade = req.body.quantidade
        const preco = req.body.preco
        const modificacao = new Date()

        conn.query('select * from produto where id = ?',[id],(err,rows)=>{
            if(err)
                return res.status(500).send('Internal Server Error')
            if(rows.length === 0)
                return res.status(400).send('Produto não existe')
            conn.query('update estoque set  quantidade = ?, preco = ? , data_modificacao = ?  where produtoid = ?',[quantidade,preco,modificacao,id], (err, rows)=>{
                if(err)
                    return res.status(500).send('Internal Server Error')
                res.status(200).json(rows)
            })
        })
    })
}))


module.exports = router
