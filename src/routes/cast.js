'use strict';

require('toml-require').install({ toml: require('toml') });
var config = require('../config.toml');

var express = require('express');
var router = express.Router();
var controller = require('../utils/controller');

/* GET home page. */
router.get('/', function (req, res) {
    controller.IsOn = true;
    res.render('cast', {
        qrcode: JSON.stringify({
            pusherAppId: config.pusherAppId,
            pusherKey: config.pusherKey,
            pusherSecret: config.pusherSecret,
            pusherCluster: config.pusherCluster,
            pusherChannel: config.pusherChannel,
        })
    });
});

module.exports = router;
