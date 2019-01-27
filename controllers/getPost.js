const Post = require('../database/models/Post');
// const User = require('../database/models/User');
// const {
//     convertTextToDelta
// } = require('node-quill-converter');
// const {
//     convertDeltaToHtml
// } = require('node-quill-converter');
// const {
//     convertHtmlToDelta
// } = require('node-quill-converter');

module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id);
    // const user = await User.findById(req.session.userId);
    // let htmlString = post.content;
    // let delta = convertHtmlToDelta(htmlString);
    // console.log(JSON.stringify(delta)); // {"ops":[{"insert":"hello, world\n"}]}
    // let html = convertDeltaToHtml(delta);
    // console.log(html);
    // console.log(user);

    //implement comments here
    //comments have: commenter-> name,email,content and blogID
    //comments are searched by async/await with  find parameter of blogID
    //eg const comments = await Comment.find({'blogId':post._id})

    res.render('post', {
        post
    });
};