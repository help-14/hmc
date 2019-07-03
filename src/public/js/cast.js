var socket = io();

// control gamepad
const gamepad = new Gamepad();

gamepad.on('press', 'button_1', () => {
    //button_1 - A (XBOX) / X (PS3/PS4)
});

gamepad.on('press', 'button_2', () => {
    //button_2 - B (XBOX) / Circle (PS3/PS4)
    window.location = '../';
});

gamepad.on('hold', 'stick_axis_left', (e) => {
    socket.emit('leftAnalog', e.value);
});

gamepad.on('hold', 'stick_axis_right', (e) => {
    socket.emit('rightAnalog', e.value);
});