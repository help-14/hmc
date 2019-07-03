'use strict';
var express = require('express');
var router = express.Router();
var controller = require('../utils/controller');

/* GET home page. */
router.get('/', function (req, res) {
    controller.IsOn = false;
    res.render('index', { title: 'Express' });
});

module.exports = router;
