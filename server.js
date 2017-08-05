const express = require('express'),
    bodyParser = require('body-parser'),    
    cookieParser = require('cookie-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//static path
app.use(express.static(path.join(__dirname,'dist')));

//connecting to database
mongoose.connect('mongodb://localhost/blog').then(()=>{
    console.log("database connection successful");
}).catch(err => {
    console.error("Database connection failed");
    console.error(err);
});

//models

//config

//controllers

//routers

//api Routes

//serving the index file for the root route
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

//Starting the server
app.listen(3000,(err) => {
    if (err) {
        console.error("Server failed");
        console.error(err);
    } else {
        console.log("running on port 3000");
    }
});
