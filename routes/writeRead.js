'use strict';

const express =require('express');
const crypto =require('crypto');
const wrRoute =express.Router();
const connection =require('../db');

wrRoute.post('/user',function(req,res,next){
    let mypass = crypto.createHash('md5').update(req.body.password).digest('hax');

    connection.execute(`INSERT INTO orders (customer_name, product, quantity, order_date, status) 
        VALUES(?,?,?,?,?);`, [req.body.customer_name,req.body.product,req.body.quantity,req.body.order_date,req.body.status]).then(()=>{
            console.log('ok');
            res.status(201).send("insert Successfully");
        }).catch((err) => {
            console.log(err);
            res.end();
        }
    );
});


wrRoute.get('/user',function(req,res,next){

    connection.execute('SELECT * FROM orders;')
    .then((resut)=>{
        var rawData = result[0];

        res.send(rawData);
    }).catch((err)=>{
        console.log(err);
        res.end();
    });
});

module.exports=wrRoute;