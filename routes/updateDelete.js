'use strict';
const express = require('express');
const udRoute = express.Router();
const connection = require('../db');
udRoute.put('/user/:id', function (req, res, next) {

   connection.execute("UPDATE orders SET customer_name =?, product =?  quantity =? order_date =? status =?WHERE customer_id=?",
    [req.body.first_name, req.body.email, req.params.uid])
     .then(() => {
       console.log('ok');
    }).catch((err) => {
       console.log(err);
    });

     res.status(200).send('Update Successfully');
});
udRoute.delete('/user/:id', function (req, res, next) {
    connection.execute("DELETE FROM orders WHERE customer_id=?;",
     [req.params.uid])
      .then(() => {
        console.log('ok');
     }).catch((err) => {
        console.log(err);
     });
      res.end();
 });
 
 udRoute.use('/', function (req, res, next) {
     res.sendStatus(404);
 })
 module.exports = udRoute;