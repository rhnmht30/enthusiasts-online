const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    username: String,
    image: String,
    createdAt: {
        type: Date,
        default: () => {
            return new Date()
        }
    }
});
// reason for this change: https://github.com/Automattic/mongoose/issues/3675#issuecomment-423473641
// () => { return new Date() }
// new Date()
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;