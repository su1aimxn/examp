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


wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body).digest("hex");

    connection.execute('SELECT * FROM orders WHERE customer_name=? AND status=?;',
    [req.body.customer_name,req.body. status])
    .then((result) => {
        var data = result[0];
        console.log(data);
        if (data.length === 0) {
           res.sendStatus(200);
        } else {
           res.sendStatus(400);
        }
     }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
     });
 
 });
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});


module.exports=wrRoute;