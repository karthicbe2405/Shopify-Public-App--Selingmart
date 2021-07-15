var express = require('express');
var router = express.Router();
let merchant = require('../services/merchantService/merchant');
let jwt = require('../utils/jwt');
let merchantModel = require('../models/merchant');
let request = require('request-promise');
let Product = require('../models/product');
let merchantProductService = require('../services/merchantService/merchantProductService');
let merchantOrderService = require('../services/merchantService/merchantOrderService');

router.get('/getProducts',async (req,res)=>{

    let token = req.query.jwt;
    let merchantId = await jwt.verifyToken(token);

    if(merchantId){

        merchantProductService.getProducts(req,res,merchantId);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }
        
});

router.post('/addProduct',async (req,res) =>{
    let product = req.body;
    let merchantId = await jwt.verifyToken(product['jwt']);
    delete product['jwt'];

    if(merchantId){

        merchantProductService.addProduct(req,res,merchantId,product);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }
});

router.put('/updateProduct',async (req,res)=>{
    let product = req.body;
    let merchantId = await jwt.verifyToken(product['jwt']);
    delete product['jwt'];

    if(merchantId){

        merchantProductService.updateProduct(req,res,merchantId,product);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }
});

router.delete('/deleteProduct',async (req,res) =>{
    
    let productID = req.body.id;
    let merchantId = await jwt.verifyToken(req.body.jwt);
    
    if(merchantId){
        
        merchantProductService.deleteProduct(req,res,merchantId,productID);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }

});

router.get('/getOrder',async (req,res)=>{
    
    let orderId = req.query.id;
    let token = req.query.jwt;
    let merchantId = await jwt.verifyToken(token);

    if(merchantId){

        merchantOrderService.getOrders(req,res,merchantId,orderId);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }
        
});

router.get('/getOrders',async (req,res)=>{

    let token = req.query.jwt;
    let merchantId = await jwt.verifyToken(token);

    if(merchantId){

        merchantOrderService.getOrders(req,res,merchantId);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }
        
});

router.post('/addOrder',async (req,res) =>{
    let order = req.body;
    let merchantId = await jwt.verifyToken(order['jwt']);
    delete order['jwt'];

    if(merchantId){

        merchantOrderService.addOrder(req,res,merchantId,order);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }
});

router.put('/updateOrder',async (req,res)=>{
    let order = req.body;
    let merchantId = await jwt.verifyToken(order['jwt']);
    delete order['jwt'];

    if(merchantId){

        merchantOrderService.updateOrder(req,res,merchantId,order);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }
});

router.delete('/deleteOrder',async (req,res) =>{
    
    let orderId = req.body.id;
    let merchantId = await jwt.verifyToken(req.body.jwt);
    
    if(merchantId){
        
        merchantOrderService.deleteOrder(req,res,merchantId,orderId);

    }
    else{

        res.status(404).json({'Message' : 'Token Invalid Please Login'});

    }

});
module.exports = router;
