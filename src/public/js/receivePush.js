Pusher.logToConsole = true;

var pusher = new Pusher("74923caab1352f6a9f10", {
    cluster: "ap1",
    forceTLS: true
});

var channel = pusher.subscribe("my-channel");
channel.bind("my-event", function (data) {
    alert(JSON.stringify(data));
});
