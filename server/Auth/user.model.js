const mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    autoIncrement = require('mongoose-sequence-plugin');
    Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    salt: String,
    hash: String
});

userSchema.plugin(autoIncrement, { field: 'userId' });

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

userSchema.methods.checkPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return hash === this.hash;
}

userSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        id: this.userId,
        fullname: this.fullname,
        exp: parseInt(expiry.getTime() / 1000),
    }, "My Secret"); //remove from the code
}

mongoose.model('User', userSchema);