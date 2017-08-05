const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-sequence')(mongoose),
    postSchema = new Schema({
        title: String,
        content: String,
        media: String,
        type: String
    });

postSchema.plugin(autoIncrement, { inc_field: 'postId' });

mongoose.model('Post',postSchema);