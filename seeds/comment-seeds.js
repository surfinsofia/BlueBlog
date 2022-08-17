const Comment = require("../models/Comment");

const commentData = [
    {
        user_id: 2,
        post_id: 1,
        comment_text: 'HTML is where everyone should begin when learning how to program and code'
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: 'Once you learn CSS, frameworks such as Bootstrap and Bulma become so crucial and time saving'
    },
    {
        user_id: 1,
        post_id: 3,
        comment_text: 'Mastering JavaScript can really brgin your application or webpage to life.'
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: 'Node.js is my go to when trying to create a server for my applications and projects'
    },
    {
        user_id: 1,
        post_id: 5,
        comment_text: 'Express is a great framwork for backend developing for APIs and web applications'
    },
    {
        user_id: 2,
        post_id: 6,
        comment_text: 'MySQL makes storing and using data for easy.'
    },
];
// creates the above comments all at once
const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;