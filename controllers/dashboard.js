const router = require('express').Router();
const { User, Post, Comment } = require("../models")
const authorization = require('../utils/authorization')

// this is the request made when the dashboard route is selected. The authorization function ensures that only logged in users can view the dashboard, which is a tailored page that only displays
// the users created posts
router.get("/", authorization, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'title',
            'created_at',
            'id',
            'post_text'
        ],
        include: [
            {
                model: User,
                attributes: [
                    'user'
                ]
            },
            {
                model: Comment,
                attributes: ['comment_text'],
                include: {
                    model: User,
                    attributes: ['user']
                }
            }
        ]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// This is the request made when the logged in user is trying to edit or delete a post that they have created. 
router.get("/edit/:id", authorization, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'title', 'created_at', 'id', 'post_text'
        ],
        include: [
            {
                model: User,
                attributes: ['user']
            }
        ]
    })
        .then(postData => {
            const posts = postData.get({ plain: true })
            res.render('editDeletePost', { posts, loggedIn: true })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router