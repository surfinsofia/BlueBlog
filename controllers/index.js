const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoute = require("./homeroute")
const dashboardRoute = require("./dashboard")

router.use('/', homeRoute)
router.use('/api', apiRoutes);
router.use("/dashboard", dashboardRoute)

module.exports = router