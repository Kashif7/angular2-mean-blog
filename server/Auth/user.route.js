const express = require('express'),
    Router = express.Router(),
    UserController = require('./user.controller');

Router.post('/register', UserController.register);
Router.post('/login', UserController.login);

module.exports = Router;