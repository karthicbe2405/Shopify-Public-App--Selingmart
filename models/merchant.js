let mongoose = require('mongoose');

var Merchant = mongoose.Schema({
    storeName : {type : String ,require : true},
    accessToken : {type : String,require : true}
}); 

module.exports = Merchant = mongoose.model('Merchant',Merchant);