// const Post = require('../database/models/Post');


module.exports = async (req, res) => {
    // to edit post get posts id here
    // add {post} as parameter  to render
    // add {{ }} to edit.edge
    // const post = await Post.findById('5c4c39fe775286639586e41b');
    // console.log(req.session.userId);
    if (req.session.userId) {
        return res.render("create");
    }

    res.redirect('/auth/login');
};