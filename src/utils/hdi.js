var robot = require("robotjs");
robot.setMouseDelay(2);

module.exports = {

    //move mouse relatively from current mouse position
    moveMouseRelative: function (x, y) {
        var mouse = robot.getMousePos();
        robot.moveMouse(mouse.x + x, mouse.y + y);
    },

    //move mouse to a position on screen
    moveMouseAbsolute: function (x, y) {
        robot.moveMouse(x, y);
    },

    //mouse click
    mouseClick: function (button = MOUSE_LEFT_BUTTON, doubleclick = false) {
        robot.mouseClick(button, doubleclick);
    },

    //mouse scroll, x: horizontal, y: vertical
    mouseScroll: function (x, y) {
        robot.scrollMouse(x, y);
    },

    //keyboard press on some function button
    keyboardPress: function (keycode, [modifier]) {
        robot.keyTap(keycode, modifier);
    },

    //hold down/up keyboard
    keyboardToggle: function (keycode, toggleSate = KEY_TOGGLE_DOWN, [modifier]) {
        robot.keyToggle(keycode, toggleSate, modifier);
    },

    //keyboard press on a-z character
    keyboardType: function (text, cpm) {
        if (cpm)
            robot.typeStringDelayed(text, cpm);
        else
            robot.typeString(text);
    },

    //hold down key
    KEY_TOGGLE_UP: 'up',
    KEY_TOGGLE_DOWN: 'down',

    //mouse constants
    MOUSE_LEFT_BUTTON: 'left',
    MOUSE_RIGHT_BUTTON: 'right',
    MOUSE_MIDDLE_BUTTON: 'middle',

    //keyboard constants
    KEYBOARD_BACKSPACE: 'backspace',
    KEYBOARD_DELETE: 'delete',
    KEYBOARD_ENTER: 'enter',
    KEYBOARD_TAB: 'tab',
    KEYBOARD_ESC: 'escape',
    KEYBOARD_UP: 'up',
    KEYBOARD_DOWN: 'down',
    KEYBOARD_RIGHT: 'right',
    KEYBOARD_LEFT: 'left',
    KEYBOARD_HOME: 'home',
    KEYBOARD_END: 'end',
    KEYBOARD_PAGE_UP: 'pageup',
    KEYBOARD_PAGE_DOWN: 'pagedown',
    KEYBOARD_F1: 'f1',
    KEYBOARD_F2: 'f2',
    KEYBOARD_F3: 'f3',
    KEYBOARD_F4: 'f4',
    KEYBOARD_F5: 'f5',
    KEYBOARD_F6: 'f6',
    KEYBOARD_F7: 'f7',
    KEYBOARD_F8: 'f8',
    KEYBOARD_F9: 'f9',
    KEYBOARD_F10: 'f10',
    KEYBOARD_F11: 'f11',
    KEYBOARD_F12: 'f12',
    KEYBOARD_COMMAND: 'command',
    KEYBOARD_ALT: 'alt',
    KEYBOARD_CTRL: 'control',
    KEYBOARD_SHIFT: 'shift',
    KEYBOARD_RIGHT_SHIFT: 'right_shift',
    KEYBOARD_SPACE: 'space',
    KEYBOARD_PRINT_SCREEN: 'printscreen',
    KEYBOARD_INSERT: 'insert',
    KEYBOARD_AUDIO_MUTE: 'audio_mute',
    KEYBOARD_AUDIO_DOWN: 'audio_vol_down',
    KEYBOARD_AUDIO_UP: 'audio_vol_up',
    KEYBOARD_AUDIO_PLAY: 'audio_play',
    KEYBOARD_AUDIO_STOP: 'audio_stop',
    KEYBOARD_AUDIO_PAUSE: 'audio_pause',
    KEYBOARD_AUDIO_PREV: 'audio_prev',
    KEYBOARD_AUDIO_NEXT: 'audio_next',
    KEYBOARD_REWIND: 'audio_rewind',
    KEYBOARD_AUDIO_FORWARD: 'audio_forward',
    KEYBOARD_AUDIO_REPEAT: 'audio_repeat',
    KEYBOARD_AUDIO_RANDOM: 'audio_random',
};