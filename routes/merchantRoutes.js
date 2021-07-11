var express = require('express');
var router = express.Router();
let dotenv = require('dotenv').config();
let nonce = require('nonce')();
let querystring = require('querystring');
let crypto = require('crypto');
let request = require('request-promise');
let session = require('express-session');


router.get('/shopify',(req,res)=>{

    let shopName = req.query.shop;
    if(shopName){
        let  homeUrl = process.env.HOME_URL;
        let apiKey = process.env.SHOPIFY_API_KEY;
        let scope = process.env.SCOPE;
        let state = nonce();
        let installUrl = 'https://' + shopName + '.myshopify.com/admin/oauth/authorize?client_id=' + apiKey + '&scope=' + scope + '&redirect_uri=' + homeUrl + '/shopify/auth&state=' + state + '&grant_options[]=per-user';
        //res.cookie('state',state);
        res.redirect(installUrl);
    }
    else{
        res.status(404).send('Shop Name Required');
    }
    
});

router.get('/shopify/auth', (req,res) =>{
    let {shop, hmac, code, state} = req.query;

    // let stateCookies = req.cookies.state;
    // if(stateCookies != state){
    //     console.log("Cookie Not Equal " + stateCookies + " " + state);
    //     console.log(shop + ' ' + hmac + ' ' + code + ' ' + state);
    //     res.status(404).send("Cookie Problem");
    // }

    if(shop && hmac && code){
        
        console.log("Every Parameters Recieved Successfully");

        const map = Object.assign({},req.query);
        delete map['hmac'];
        const message = querystring.stringify(map);

        // const generatedHash = crypto.createHmac('abc123',process.env.SHOPIFY_API_SECRET).update(message).digest('hex');
        // console.log(generatedHash + " " + hmac);
        // if(generatedHash != hmac){
        //     console.log(generatedHash + " " + hmac);
        //     console.log("Hmac Validation Failed");
        //     res.status(404).send("Authentication Failed");
        // }
        // else{
            
            // getting Access Token
            let acccessTokenRequesrUrl = 'https://' + shop + '/admin/oauth/access_token'
            let accessTokenPayLoad = {
                client_id : process.env.SHOPIFY_API_KEY,
                client_secret : process.env.SHOPIFY_API_SECRET,
                code
            }

            request.post(acccessTokenRequesrUrl,{json : accessTokenPayLoad}).then((accessTokenResponse)=>{
                let access_token = accessTokenResponse.access_token;
                console.log("Access Token " + access_token);

                //Geeting List of Products in the Store  using Api Call
                let apiRequestUrl = 'https://' + shop + '/admin/api/2021-07/products.json';
                let apiRequestHeader = {
                    'X-Shopify-Access-Token' : access_token
                };

                request.get(apiRequestUrl,{headers : apiRequestHeader})
                .then((apiResponse)=>{
                    console.log("Products Retrieved Successfully");
                    res.end(apiResponse);
                })
                .catch((err)=>{
                    console.log("Some Error Occured During Products Retrieval");
                    res.status(404).send("Something Went Wrong" + err);
                })

            });
    }
    else{
        res.status(404).send("Required Parameters Missing");
    }
    
});

module.exports = router;
