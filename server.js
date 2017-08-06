const express = require('express'),
    bodyParser = require('body-parser'),    
    cookieParser = require('cookie-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
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
require('./server/user/user.model');
require('./server/post/post.model');

//config
require('./config/passport.js');//local authentication
app.use(passport.initialize());//has to be initialized after importing models and before routes

//controllers
require('./server/user/auth/auth.controller');
require('./server/user/api/user.controller');

//routers
const AuthRouter = require('./server/user/auth/auth.route');
const UserRouter = require('./server/user/api/user.route');

//api Routes
app.use('/api/auth',AuthRouter);//todo: move the routes to a separate file
app.use('/api/users',UserRouter);

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
