let mongoose = require('mongoose');
let databasePassword = process.env.DATABASE_PASSWORD
let connectionUrl = 'mongodb+srv://karthicbe2405:'+ databasePassword +'@cluster0.pgj2g.mongodb.net/db1?retryWrites=true&w=majority';

let db = mongoose.connect(connectionUrl,{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(!err){
        console.log("DB Connection Establised Successfully");
    }
    else{
        console.log("DB Connection UnsuccessFull");
    }
})
module.exports=db;