var express = require("express");
var router = express.Router();
var UserRouter = require("./admin/UserRouter.js");
var NewRouter = require("./admin/NewRouter.js");
router.use(NewRouter);
router.use(UserRouter);

module.exports = router;
