const router = require("express").Router();
const { User, Post, Comment } = require("../../models")

// route to get all comments that are in the database
router.get("/", (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text'
        ],
        include: [
            {
                model: User,
                attributes: ['user']
            },
            {
                model: Post,
                attributes: ['title', 'post_text']
            }
        ]
    })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

// route to get a specific comment from the database using the URL for the id of the comment
router.get("/:id", (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment_text'
        ],
        include: [
            {
                model: User,
                attributes: ['user']
            },
            {
                model: Post,
                attributes: ['title']
            }
        ]
    })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'No comment with this ID was found' });
                return
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

// route for creating a post
router.post('/', (req, res) => {
    Comment.create({
        user_id: req.session.user_id,
        post_id: req.body.post_id,
        comment_text: req.body.comment_text
    })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for updating a comment
router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'No comment with this ID was found' });
                return
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for deleting a comment
router.delete("/:id", (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                res.status(404).json({ message: 'No comment with this ID was found' });
                return
            }
            res.json(commentData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;