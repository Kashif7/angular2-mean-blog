const express = require('express'),
    Router = express.Router(),
    AuthController = require('./auth.controller');

Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);

module.exports = Router;