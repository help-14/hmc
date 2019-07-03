"use strict";

var debug = require("debug");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
//const puppeteer = require('puppeteer');
var robot = require("./utils/hdi");

//var controller = require('./utils/controller');

//read config file
require('toml-require').install({ toml: require('toml') });
var config = require('./config.toml');

//create chrome window
var page = null;

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

//load plugin
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//express routings
var routes = require("./routes/index");
var castRouter = require("./routes/cast");
var users = require("./routes/users");
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
    robot.moveMouseRelative(pos[0], pos[1]);
}

io.on('connection', function (socket) {
    socket.on('leftAnalog', function (msg) {
        robot.moveMouseRelative(msg[0] * config.leftAnalogMouseSpeed, msg[1] * config.leftAnalogMouseSpeed);
    });
    socket.on('rightAnalog', function (msg) {
        robot.moveMouseRelative(msg[0] * config.rightAnalogMouseSpeed, msg[1] * config.rightAnalogMouseSpeed);
    });
    socket.on('mouseclick', function (msg) {
        robot.mouseClick(msg);
    });
});

//run web server
http.listen(3000, async () => {
    console.log('listening on *:3000');

    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: [
    //         '--disable-infobars',
    //         '--start-fullscreen',
    //         '--kiosk',
    //         '--disable-session-crashed-bubble',
    //         '--noerrdialogs'
    //     ]
    // });
    // page = await browser.newPage();
    // await page.goto('http://localhost:3000/');
});
