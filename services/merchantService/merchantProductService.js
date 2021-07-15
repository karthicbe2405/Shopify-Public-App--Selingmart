let request = require('request-promise');
let merchantModel = require('../../models/merchant');
let productModel = require('../../models/product');
class MerchantProduct{

    async getProducts(req,res,merchantId){

        let merchant = await merchantModel.findById(merchantId._id);

        let apiRequestUrl = 'https://' + merchant.storeName + '/admin/api/2021-07/products.json';
                
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

    async addProduct(req,res,merchantId,product){

        let merchant = await merchantModel.findById(merchantId._id);

        let apiRequestUrl = 'https://' + merchant.storeName + '/admin/products.json';

        let apiRequest = {
            method: 'POST',
            uri: apiRequestUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': merchant.accessToken,
                'content-type': 'application/json'
            },
            body: product
        };

        request.post(apiRequest)
            .then(async(response) =>{
                if (response.statusCode == 201) {
                    
                    let product = new productModel(response.body.product);
                    await product.save();

                    res.status(200).json({'Message' : 'Product Added SuccessFully'});

                } else {

                    res.status(404).json({'Message' : 'Failed to Add Product'});

                }
            })
            .catch(function (err) {

                res.status(404).json({'Message' : 'Something Went Wrong'});

            });
        }

    async updateProduct(req,res,merchantId,product){


        let merchant = await merchantModel.findById(merchantId._id);

         let apiRequestUrl = 'https://' + 'eunimarttest1.myshopify.com' + '/admin/products/' + product['product'].id +'.json';
    
        let apiRequest = {
            method: 'PUT',
            uri: apiRequestUrl,
            json: true,
                resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': merchant.accessToken,
                'content-type': 'application/json'
            },
            body: product
        };
    
        request.put(apiRequest)
        .then(async(response) =>{
            if (response.statusCode == 200) {

                await productModel.findOneAndUpdate({id: response.body.product.id}, {$set:response.body.product}, {new: true, useFindAndModify: false}, (err, doc) => {  
                    if (err) {
                        res.status(404).json({'Message' : 'Product Update Failed in Local Database'});
                    }
                    else{
                        res.status(200).json({'Message' : 'Product Updated SuccessFully'});
                    };
               });
                
            } else {
                res.status(404).json({'Message' : 'Product Update Failed'});
            }
        })
        .catch(function (err) {
            
            res.status(404).json({'Message' : 'Somehting Went Wrong'});
        });
    }

    async deleteProduct(req,res,merchantId,productId){


        let merchant = await merchantModel.findById(merchantId._id);

        let apiRequestUrl = 'https://' + 'eunimarttest1.myshopify.com' + '/admin/products/' + productId +'.json';
    
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

                await productModel.deleteOne({id: productId},(err, doc) => {  
                    if (err) {
                        res.status(404).json({'Message' : 'Product Deletion Failed in Local Database'});
                    }
                    else{
                        res.status(200).json({'Message' : 'Product Deleted SuccessFully'});
                    };
               });
                
            } else {
                res.status(404).json({'Message' : 'Product Deletion Failed'});
            }
        })
        .catch(function (err) {
            
            res.status(404).json({'Message' : 'Somehting Went Wrong'});
        });
    }
}


module.exports = new MerchantProduct();