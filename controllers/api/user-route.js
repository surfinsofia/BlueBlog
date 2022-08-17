const router = require("express").Router();
const { User, Post, Comment } = require("../../models")

// route for getting all users in the database
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

// route for getting a specific user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: ['user', 'email', 'password'],
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text']
            }
        ],
        where: {
            id: req.params.id
        },
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for creating a new user
router.post('/', (req, res) => {
    User.create({
        user: req.body.user,
        email: req.body.email,
        password: req.body.password
    })
        .then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                // when a new user is created, it saves the information on the session to be used later when creating post
                req.session.username = userData.user
                // ensures that when a user signup, they are redirected to the web page with a logged in status
                req.session.loggedIn = true

                res.json(userData)
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for updating a users information
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for deleting a user
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// route to check the database for existing users when they are attempting to log in
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            user: req.body.user
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that email address!' });
                return;
            }
            // this will check whether the password entered is the same as from the database
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                // like signing up, the ID and user is saved to the session and returned with a logged in status
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.user;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });
});

// then the logout route is selected, the session will be ended and logged in status will become false, restricting what the logged out user can see and do
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router;