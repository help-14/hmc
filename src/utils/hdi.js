var robot = require("robotjs");
robot.setMouseDelay(2);

module.exports = {
    moveMouseRelative: function (x, y) {
        var mouse = robot.getMousePos();
        robot.moveMouse(mouse.x + x, mouse.y + y);
    },
    moveMouseAbsolute: function (x, y) {
        robot.moveMouse(x, y);
    },
    keyboardPress: function (keycode) {
        robot.keyTap(keycode);
    },
    keyboardType: function (text) {
        robot.typeString(text);
    }
};