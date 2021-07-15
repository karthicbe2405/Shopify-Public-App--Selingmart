var express = require('express');
var router = express.Router();
let Oauth = require('../services/oAuthServices/oAuth');
let merchant = require('../services/merchantService/merchant');
let jwt = require('../utils/jwt');

router.get('/shopify',(req,res)=>{
    
    let shopName = req.query.shop;

    if(shopName){
        Oauth.getOauth(req,res);
    }
    else{
        res.status(404).json({'Message' : 'ShopName Required'});
    }

});

router.get('/shopify/auth', async (req,res) =>{
    
    let {shop, hmac, code, state} = req.query;
    
    if(shop, hmac, code, state){

        try{

            let accessTokenResponse = await Oauth.getAccessToken(shop,hmac,code,state);
            let merchantDocument = await merchant.merchantSignup(shop,accessTokenResponse.access_token);
            let token = await jwt.generateToken(merchantDocument._id);
            res.status(200).json({'Jwt' : token});

        }
        catch(err){

            console.log('The error is' + err);
            res.status(404).json({'Message' : 'Something Went Wrong'});

        }
                  
    }
    else{

        res.status(404).json({'Message':'Required Parameters Not Recived From Shopify Redirection URL'});

    }

});

module.exports = router;
