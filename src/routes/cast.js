'use strict';

require('toml-require').install({ toml: require('toml') });
var config = require('../config.toml');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
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
