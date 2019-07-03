const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyEnter = 13;
const keySpace = 32;
const keyBackSpace = 8;

var seletedRow = 0;
var selectedCol = 0;
var table = [];

var socket = io();

//find all menu items
$(document).ready(function () {
    var rows = document.querySelectorAll('.menu-row');
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].querySelectorAll('.menu-item'));
    }
});

//show controller toast dialog
function ShowControllerToast(message, icon) {
    document.querySelector('#controllerToast .toast-body').innerHTML = message;
    if (icon) document.querySelector('#controllerIcon').className = icon;
    $('#controllerToast').toast('show');
}

//show toast dialog
function ShowToast(message, icon) {
    document.querySelector('#dialogToast .toast-body').innerHTML = message;
    document.querySelector('#toastIcon').className = icon || "far fa-bell";
    $('#dialogToast').toast('show');
}

//controller connected
window.addEventListener("gamepadconnected", function (e) {
    let mess = "Gamepad connected: ";
    let controllerName = e.gamepad.id.toLowerCase();

    if (controllerName.includes('xbox'))
        ShowControllerToast(mess + 'Xbox controller', "fab fa-3x fa-xbox");
    else if (controllerName.includes('play') || controllerName.includes('054c'))
        ShowControllerToast(mess + 'PlayStation controller', "fab fa-3x fa-playstation");
    else
        ShowControllerToast(mess + e.gamepad.id, "fas fa-3x fa-gamepad");
});

//controller disconnected
window.addEventListener("gamepaddisconnected", function (e) {
    ShowControllerToast("Gamepad disconnected.");
});

//handling user input
function keypress(keycode) {
    //detect keypress
    if (keycode == keyUp) {
        seletedRow--;
    }
    else if (keycode == keyDown) {
        seletedRow++;
    }
    else if (keycode == keyLeft) {
        selectedCol--;
        if (selectedCol < 0) {
            if (seletedRow > 0) {
                seletedRow--;
                selectedCol = table[seletedRow].length - 1;
            }
            else selectedCol = 0;
        }
    }
    else if (keycode == keyRight) {
        selectedCol++;
        if (selectedCol >= table[seletedRow].length) {
            if (seletedRow < table.length - 1) {
                seletedRow++;
                selectedCol = 0;
            }
            else selectedCol = table[seletedRow].length - 1;
        }
    }

    //verify row
    if (seletedRow < 0) seletedRow = 0;
    else if (seletedRow >= table.length) seletedRow = table.length - 1;

    //verify colume
    if (selectedCol < 0) selectedCol = 0;
    else if (selectedCol >= table[seletedRow].length) selectedCol = table[seletedRow].length - 1;

    //clear previous selected
    var previousSelected = document.querySelector('.menu-selected');
    if (previousSelected) previousSelected.classList.remove("menu-selected");

    //set new selected
    table[seletedRow][selectedCol].classList.add("menu-selected");
}

//detect keyboard input
$(document).keydown(function (e) {
    keypress(e.which);
});

// control gamepad
const gamepad = new Gamepad();

gamepad.on('connect', e => {
    console.log(`controller ${e.index} connected!`);
});

gamepad.on('press', 'button_1', () => {
    //button_1 - A (XBOX) / X (PS3/PS4)
    keypress(keySpace);
});

gamepad.on('press', 'button_2', () => {
    //button_2 - B (XBOX) / Circle (PS3/PS4)
    keypress(keyBackSpace);
});

gamepad.on('press', 'button_3', () => {
    //button_3 - X (XBOX) / Square (PS3/PS4)
    socket.emit('mouseclick', 'left');
});

gamepad.on('press', 'button_4', () => {
    //button_4 - Y (XBOX) / Triangle (PS3/PS4)
    socket.emit('mouseclick', 'left');
});

gamepad.on('press', 'd_pad_up', () => {
    //d_pad_up - Up on the D-Pad (XBOX/PS3/PS4)
    keypress(keyUp);
});

gamepad.on('press', 'd_pad_down', () => {
    //d_pad_down - Down on the D-Pad (XBOX/PS3/PS4)
    keypress(keyDown);
});

gamepad.on('press', 'd_pad_left', () => {
    //d_pad_left - Left on the D-Pad (XBOX/PS3/PS4)
    keypress(keyLeft);
});
gamepad.on('press', 'd_pad_right', () => {
    //d_pad_right - Right on the D-Pad (XBOX/PS3/PS4)
    keypress(keyRight);
});

gamepad.on('hold', 'stick_axis_left', (e) => {
    socket.emit('leftAnalog', e.value);
});

gamepad.on('hold', 'stick_axis_right', (e) => {
    socket.emit('rightAnalog', e.value);
});