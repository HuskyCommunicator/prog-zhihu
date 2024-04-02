var express = require("express");
var router = express.Router();
var UserRouter = require("./admin/UserRouter.js");
var NewRouter = require("./admin/NewRouter.js");
router.use(UserRouter);
router.use(NewRouter);
module.exports = router;
