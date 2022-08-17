const router = require("express").Router();

const userRoutes = require("./user-route");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-route");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router

// this page determines the routes for user, post and comment data