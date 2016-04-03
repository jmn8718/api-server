var express = require('express');
var router = express.Router();

var users = require('./v1/users');

router.use('/v1/users', users );

module.exports = router;