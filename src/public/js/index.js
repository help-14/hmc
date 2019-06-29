const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const keyEnter = 13;
const keySpace = 32;

var seletedRow = 0;
var selectedCol = 0;
var table = [];

//find all menu items
$(document).ready(function () {
    var rows = document.querySelectorAll('.menu-row');
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].querySelectorAll('.menu-item'));
    }
});

//show controller toast dialog
function ShowControllerToast(message, icon){
    document.querySelector('#controllerToast .toast-body').innerHTML = message;
    if(icon) document.querySelector('#controllerIcon').className = icon;
    $('#controllerToast').toast('show');
}

//show toast dialog
function ShowToast(message, icon){
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

//detect keyboard input
$(document).keydown(function (e) {
    console.log('key: ' + e.which.toString());

    //detect keypress
    if (e.which == keyUp) {
        seletedRow--;
    }
    else if (e.which == keyDown) {
        seletedRow++;
    }
    else if (e.which == keyLeft) {
        selectedCol--;
        if (selectedCol < 0) {
            if (seletedRow > 0) {
                seletedRow--;
                selectedCol = table[seletedRow].length - 1;
            }
            else selectedCol = 0;
        }
    }
    else if (e.which == keyRight) {
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
});

var gamepad = new Gamepad();
gamepad.bind(Gamepad.Event.CONNECTED, function(device) {
    // a new gamepad connected
    //console.log(device);
});
gamepad.bind(Gamepad.Event.DISCONNECTED, function(device) {
    // gamepad disconnected
});
gamepad.bind(Gamepad.Event.UNSUPPORTED, function(device) {
    // an unsupported gamepad connected (add new mapping)
});

gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e) {
    // e.control of gamepad e.gamepad pressed down
    console.log('down');
    console.log(e);
});

gamepad.bind(Gamepad.Event.BUTTON_UP, function(e) {
    // e.control of gamepad e.gamepad released
    console.log('up');
    console.log(e);
});

gamepad.bind(Gamepad.Event.AXIS_CHANGED, function(e) {
    // e.axis changed to value e.value for gamepad e.gamepad
});

gamepad.bind(Gamepad.Event.TICK, function(gamepads) {
    // gamepads were updated (around 60 times a second)
});

if (!gamepad.init()) {
    // Your browser does not support gamepads, get the latest Google Chrome or Firefox
}