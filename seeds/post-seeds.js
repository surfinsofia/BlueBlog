const Post = require("../models/Post");

const postData = [
    {
        title: 'My first Blue Post',
        post_text: 'Hello World How Are You? Greetings from Austin Texas, Live Musical Capital of the World!',
        user_id: 1
    }
];

// creates all the posts at once 
const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;