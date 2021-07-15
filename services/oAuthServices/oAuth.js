let dotenv = require('dotenv').config();
let nonce = require('nonce')();
let request = require('request-promise');
class OAUTH{
    
    getOauth(req,res){

        let shopName = req.query.shop;

        if(shopName){

            let  homeUrl = process.env.HOME_URL;
            let apiKey = process.env.SHOPIFY_API_KEY;
            let scope = process.env.SCOPE;
            let state = nonce();
            let installUrl = 'https://' + shopName + '.myshopify.com/admin/oauth/authorize?client_id=' + apiKey + '&scope=' + scope + '&redirect_uri=' + homeUrl + '/shopify/auth&state=' + state + '&grant_options[]=per-user';
            res.redirect(installUrl);
        }
        else{

            res.status(404).json({'Message':'Shop Name Required'});

        }
    }

    getAccessToken(shop,hmac,code,state){

        let acccessTokenRequestrUrl = 'https://' + shop + '/admin/oauth/access_token';
        
            let accessTokenPayLoad = {
                client_id : process.env.SHOPIFY_API_KEY,
                client_secret : process.env.SHOPIFY_API_SECRET,
                code
            }

        let accessTokenResponse =  request.post(acccessTokenRequestrUrl,{json : accessTokenPayLoad})

        return accessTokenResponse
            
    }

}

module.exports = new OAUTH();