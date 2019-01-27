const path = require('path')
const Post = require('../database/models/Post')
const User = require('../database/models/User');

module.exports = async (req, res) => {
    const user = await User.findById(req.session.userId);
    // console.log(User.findById(req.session.userId));
    // console.log(user);
    // console.log(req.body);

    const {
        image
    } = req.files;

    image.mv(path.resolve(__dirname, '..', 'public/posts', image.name), (error) => {
        Post.create({
            username: user.username,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            image: `/posts/${image.name}`
        }, (error, post) => {
            // res.redirect("/");
            // res.render('post', {
            //     post
            // });
            res.redirect('/post/' + post._id);
        });
    })
}