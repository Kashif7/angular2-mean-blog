const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post'),
    multer = require('multer'),
    upload = multer({ dest: 'uploads/' }),
    maxPageData = 3;

module.exports.getPageCount = (req,res) => {
    User.findOne({ userId: req.params.userId }).then(user => {
        res.send({postCount: user.posts.length});
    });
}    

module.exports.getPosts = (req, res) => {

    if (req.query.page) {
        let start = parseInt(req.query.page * maxPageData - maxPageData);
        let end = parseInt(start + maxPageData);

        User.findOne({ userId: req.params.userId }).populate({path:'posts',match: { postId: { $gt: start, $lte: end}}}).exec().then(user => {
            res.send(user.posts);
        }).catch(err => {
            res.send({ error: err });
        });
    }
}

module.exports.getPost = (req, res) => {
    Post.findOne({ postId: req.params.postId }).then(post => {
        res.send(post);
    }).catch(err => {
        res.send({ error: err });
    });
}

module.exports.addPost = (req, res) => {
    let file = req.file;

    if (file) {
        let fileType = file.mimetype.split('/');

        let newPost = new Post(req.body);
        newPost.type = fileType[0];
        newPost.media = file.path;

        newPost.save().then(() => {
            User.findOne({ userId: req.params.userId }).then(user => {
                user.posts.push(newPost._id);

                user.save().then(user => {
                    res.send(user);
                }).catch(err => {
                    res.send({ error: err });
                });
            }).catch(err => {
                res.send({ error: err });
            });
        }).catch(err => {
            res.send({ error: err });
        });
    }
}

module.exports.updatePost = (req, res) => {
    Posts.findOneAndUpdate({ postId: req.params.postId }, { $set: req.body }).then(post => {
        res.send(post);
    }).catch(err => {
        res.send({ error: err });
    });
};  

module.exports.getUsers = (req,res) => {
    console.log("zxssc");
    console.log(req.query);
    res.json(["ssssfs","ssdsfsfs"]);
}