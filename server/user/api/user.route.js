const express = require('express'),
    Router = express.Router(),
    multer = require('multer'),
    UserController = require('./user.controller');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') //upload directory
    },
    filename: function (req, file, cb) {
        let type = file.mimetype.split('/');
        cb(null, Date.now() + '.' + type[1]) //Appending filetype
    }
});

var upload = multer({ storage: storage });
Router.get('/',UserController.getUsers);
Router.get('/:userId/posts',UserController.getPosts);
Router.get('/:userId/posts/:postId',UserController.getPost);
Router.post('/:userId', upload.single('file'),UserController.addPost);
Router.put('/:userId/posts/:postId',UserController.updatePost);



module.exports = Router;