let express = require('express');
let app = express();
let session = require('express-session');
let cookie = require('cookie');
let merchantRouter = require('./routes/merchantRoutes');

// let sessionOption = session({
//     secret : "xyz",
//     resave : false,
//     saveUninitialized : false,
//     cookie : {maxAge : 1000 * 60 * 60 * 24 , httpOnly : true}
// });

//app.use(sessionOption)

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("Server Started Successfully At Port Number : " + 3000);
});

app.use('/',merchantRouter);