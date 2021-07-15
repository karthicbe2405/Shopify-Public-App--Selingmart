let mongoose = require('mongoose');

var Product = mongoose.Schema({
    id: {type:Number,require:true},
    title: {type:String,require:true},
    body_html: {type:String,require:true},
    vendor: {type:String,require:true},
    product_type: {type:String,require:true},
    created_at: {type:String,require:true},
    handle: {type:String,require:true},
    updated_at: {type:String,require:true},
    published_at: {type:String,require:true},
    template_suffix: {type:String,require:false},
    created_at: {type:String,require:true},
    handle: {type:String,require:true},
    updated_at: {type:String,require:true},
    published_at: {type:String,require:true},
    template_suffix: {type:String,require:false},
    status: {type:String,require:true},
    published_scope: {type:String,require:true},
    tags: {type:String,require:true},
    admin_graphql_api_id: {type:String,require:true},
    variants: {type:Array,require:false},
    options: {type:Array,require:false},
    images: {type:Array,require:false},
    image: {type:String,require:false}
});

module.exports = Product = mongoose.model('Product',Product);
// var product = {
//     id: 6842088980661,
//     title: 'testProduct',
//     body_html: '<strong>Nice Product</strong>',
//     vendor: 'testVendor',
//     product_type: 'Mobile',
//     created_at: '2021-07-13T16:46:07+05:30',
//     handle: 'testproduct',
//     updated_at: '2021-07-13T16:46:07+05:30',
//     published_at: '2021-07-13T16:46:07+05:30',
//     template_suffix: null,
//     created_at: '2021-07-13T16:46:07+05:30',
//     handle: 'testproduct',
//     updated_at: '2021-07-13T16:46:07+05:30',
//     published_at: '2021-07-13T16:46:07+05:30',
//     template_suffix: null,
//     status: 'active',
//     published_scope: 'web',
//     tags: 'Electronic',
//     admin_graphql_api_id: 'gid://shopify/Product/6842088980661',
//     variants: [ [Object] ],
//     options: [ [Object] ],
//     images: [],
//     image: null
//   }