"use strict";

var debug = require("debug");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

//read config file
require('toml-require').install({ toml: require('toml') });
var config = require('./config.toml');

//load robotjs to control mouse, keyboard
var robot = require("robotjs");
robot.setMouseDelay(2);

//express routings
var routes = require("./routes/index");
var castRouter = require("./routes/cast");
var users = require("./routes/users");

//create express app
var app = express();

//start socket.io
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// add favicon
app.use(favicon(__dirname + "/public/favicon.ico"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/cast", castRouter);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

app.set("port", process.env.PORT || 3000);

function moveMouse(pos) {
    var mouse = robot.getMousePos();
    robot.moveMouse(mouse.x + pos[0] * config.mouseSpeed, mouse.y + pos[1] * config.mouseSpeed);
}

io.on('connection', function (socket) {
    socket.on('mouse', function (msg) {
        moveMouse(msg);
    });
});

// var server = app.listen(app.get("port"), function () {
//     debug("Express server listening on port " + server.address().port);
// });
http.listen(3000, function () {
    console.log('listening on *:3000');
});
