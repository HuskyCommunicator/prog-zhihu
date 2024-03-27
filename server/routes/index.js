var express = require('express');
var router = express.Router();
var UserRouter=require("./admin/UserRouter.js")

router.use(UserRouter);
module.exports = router;
