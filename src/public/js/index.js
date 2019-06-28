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
$(document).ready(function() {
    var rows = document.querySelectorAll('.menu-row');
    for (var i = 0; i < rows.length; i++) {
        table.push(rows[i].querySelectorAll('.menu-item'));
    }
});

var gamepadAPI = {
    controller: {},
    turbo: false,
    connect: function(){},
    disconnect: function(){},
    update: function() { },
    buttonPressed: function() {},
    buttons: [
        'DPad-Up','DPad-Down','DPad-Left','DPad-Right',
        'Start','Back','Axis-Left','Axis-Right',
        'LB','RB','Power','A','B','X','Y',
    ],
    buttonsCache: [],
    buttonsStatus: [],
    axesStatus: []
};

//controller connected
gamepadAPI.connect = function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);

    gamepadAPI.controller = e.gamepad;
    gamepadAPI.turbo = true;

    var icon = document.querySelector('#controllerIcon');
    let controllerName = e.gamepad.id.toLowerCase();

    if(controllerName.includes('xbox'))
        icon.className = "fab fa-3x fa-xbox";
    else if(controllerName.includes('play') || controllerName.includes('054c'))
        icon.className = "fab fa-3x fa-playstation";
    else 
        icon.className = "fas fa-3x fa-gamepad";

    document.querySelector('#controllerToast .toast-body').innerHTML = "Gamepad connected: " + e.gamepad.id;
    $('#controllerToast').toast('show');
};
window.addEventListener("gamepadconnected", gamepadAPI.connect);

//controller disconnected
gamepadAPI.disconnect = function(e) {
    console.log("Gamepad disconnected from index %d: %s",
                e.gamepad.index, e.gamepad.id);
    
    gamepadAPI.turbo = false;
    delete gamepadAPI.controller;

    document.querySelector('#controllerToast .toast-body').innerHTML = "Gamepad disconnected.";
    $('#controllerToast').toast('show');
};
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);

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