const router = require("express").Router();
const sequelize = require("../config/connection")
const { User, Post, Comment } = require('../models')

// this route is for the homepage, it displays all existing posts and sends them to the homepage handlebars page
router.get("/", (req, res) => {
    Post.findAll({
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
            }
        ]
    })
        .then(postData => {
            // plain: true gives only the information that is necessary (the object requested in the findlAll request)
            const posts = postData.map(post => post.get({ plain: true }));
            // By sending the loggedIn variable, it allows us to display content depending on the users login status
            res.render('homepage', { posts, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

// This route is when a user selects an individual post and a single post page is rendered
router.get('/post/:id', (req, res) => {
    Post.findOne({
        attributes: [
            'id',
            'title',
            'post_text',
            'user_id',
            'created_at'
        ],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['user']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['user']
                }
            }
        ]
    })
        .then(postData => {
            const posts = postData.get({ plain: true });
            res.render('singlePost', { posts, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// this request is made when the login navigation link is selected. It will redirect to the homepage if the user is already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
});

module.exports = router;