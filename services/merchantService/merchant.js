let MerchantModel = require('../../models/merchant');

class Merchant{

    merchantSignup(store,access_token){
        let merchant = new MerchantModel({storeName : store,accessToken:access_token});
        return merchant.save();
    }
}

module.exports = new Merchant();