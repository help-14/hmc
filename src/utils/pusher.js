var Pusher = require("pusher");

require('toml-require').install({ toml: require('toml') });
var config = require('../config.toml');

var pusher = new Pusher({
    appId: config.pusherAppId,
    key: config.pusherKey,
    secret: config.pusherSecret,
    cluster: config.pusherCluster,
    encrypted: true
});

function SendPush(eventName, data) {
    pusher.trigger(config.pusherChannel, eventName, data);
}

module.exports = SendPush;