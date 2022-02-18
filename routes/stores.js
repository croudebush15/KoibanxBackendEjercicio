const express = require('express');
const router = express.Router();
const Store = require('../models/store');

router.route('/stores')
  .get(function(req, res, next){
    //mostrar la validación de usuario
    console.log("Información de usuario autenticado: " + req.user);
    next()
  }, function(req, res, next){    
    const page = parseInt(req.query.page) - 1 || 0;
    const limit =  parseInt(req.query.limit || 10);
    var query =  req.query.q ?? null;    
    
    Store.find(JSON.parse(query))
    .limit(limit)
    .skip(page*limit)
    //por defecto filtra por nombre ASC
    .sort([['name', 1]])
    .then(function(stores) {
      Store.estimatedDocumentCount()
      .then(function(total){
        const pages = Math.ceil(total/limit); 
        const jsonObject = {data: stores, page: page + 1, pages: pages, limit: limit, total: total};
        res.send(jsonObject);    
      }).catch(function(err){
        next(err);
      });              
    }).catch(function(err){
      next(err);
    });
  });

router.route('/stores')
  .post(function(req, res, next){
    //mostrar la validación de usuario
    console.log("Información de usuario autenticado: " + req.user);
    next()
  }, function(req, res, next){    
    Store.create(req.body).
    then(function(store){  
    res.send(store);
    }).catch(function(err){
      next(err);
    });        
  }); 

module.exports = router;
