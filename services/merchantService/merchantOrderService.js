let request = require('request-promise');
let merchantModel = require('../../models/merchant');
let productModel = require('../../models/product');
let orderModel = require('../../models/order');
class MerchantOrder{
    
    async getOrder(req,res,merchantId,orderId){

        let merchant = await merchantModel.findById(merchantId._id);

        let apiRequestUrl = 'https://' + merchant.storeName + '/admin/api/2021-07/'+ orderId +'.json';
                
        let apiRequestHeader = {
                'X-Shopify-Access-Token' : merchant.accessToken
            };
                
        request.get(apiRequestUrl,{headers : apiRequestHeader})
        .then((apiResponse)=>{
            res.end(apiResponse);
        })
        .catch((err)=>{
            res.status(404).send("Something Went Wrong" + err);
        })
    }

    async getOrders(req,res,merchantId){

        let merchant = await merchantModel.findById(merchantId._id);

        let apiRequestUrl = 'https://' + merchant.storeName + '/admin/api/2021-07/orders.json?status=any';
                
        let apiRequestHeader = {
                'X-Shopify-Access-Token' : merchant.accessToken
            };
                
        request.get(apiRequestUrl,{headers : apiRequestHeader})
        .then((apiResponse)=>{
            res.end(apiResponse);
        })
        .catch((err)=>{
            res.status(404).send("Something Went Wrong" + err);
        })
    }

    async addOrder(req,res,merchantId,order){

        let merchant = await merchantModel.findById(merchantId._id);

        let apiRequestUrl = 'https://' + merchant.storeName + '/admin/api/2021-07/orders.json';

        let apiRequest = {
            method: 'POST',
            uri: apiRequestUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': merchant.accessToken,
                'content-type': 'application/json'
            },
            body: order
        };

        request.post(apiRequest)
            .then(async(response) =>{
                if (response.statusCode == 201) {
                    console.log(response.body.order);
                    let order = new orderModel(response.body.order);
                    await order.save();

                    res.status(200).json({'Message' : 'Order Added SuccessFully'});

                } else {

                    res.status(404).json({'Message' : 'Failed to Add Order'});

                }
            })
            .catch(function (err) {
                console.log(err);
                res.status(404).json({'Message' : 'Something Went Wrong'});

            });
        }

    async updateOrder(req,res,merchantId,order){


        let merchant = await merchantModel.findById(merchantId._id);

         let apiRequestUrl = 'https://' + merchant.storeName + '/admin/api/2021-07/orders/' + order['order'].id +'.json';
    
        let apiRequest = {
            method: 'PUT',
            uri: apiRequestUrl,
            json: true,
                resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': merchant.accessToken,
                'content-type': 'application/json'
            },
            body: order
        };
    
        request.put(apiRequest)
        .then(async(response) =>{
            if (response.statusCode == 200) {

                await orderModel.findOneAndUpdate({id: response.body.order.id}, {$set:response.body.order}, {new: true, useFindAndModify: false}, (err, doc) => {  
                    if (err) {
                        res.status(404).json({'Message' : 'Order Update Failed in Local Database'});
                    }
                    else{
                        res.status(200).json({'Message' : 'Order Updated SuccessFully'});
                    };
               });
                
            } else {
                res.status(404).json({'Message' : 'Order Update Failed'});
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(404).json({'Message' : 'Somehting Went Wrong'});
        });
    }

    async deleteOrder(req,res,merchantId,orderId){


        let merchant = await merchantModel.findById(merchantId._id);

        let apiRequestUrl = 'https://' + merchant.storeName + '/admin/api/2021-07/orders/' + orderId +'.json';
    
        let apiRequest = {
            method: 'DELETE',
            uri: apiRequestUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': merchant.accessToken,
                'content-type': 'application/json'
            }
        };
    
        request.delete(apiRequest)
        .then(async(response) =>{
            if (response.statusCode == 200) {

                await orderModel.deleteOne({id: orderId},(err, doc) => {  
                    if (err) {
                        res.status(404).json({'Message' : 'Order Deletion Failed in Local Database'});
                    }
                    else{
                        res.status(200).json({'Message' : 'Order Deleted SuccessFully'});
                    };
               });
                
            } else {
                res.status(404).json({'Message' : 'Order Deletion Failed'});
            }
        })
        .catch(function (err) {
            console.log(err);
            res.status(404).json({'Message' : 'Somehting Went Wrong'});
        });
    }
}


module.exports = new MerchantOrder();