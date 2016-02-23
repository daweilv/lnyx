var ws = new WebSocket("ws://localhost:2333/", "echo-protocol");
ws.onopen = function () {
    console.log("open");
    ws.send("client: hello!");
};
ws.onmessage = function (evt) {
    console.log(evt.data)
    $('body').append(evt.data+'<br>');
};
ws.onclose = function (evt) {
    console.log("WebSocketClosed!");
};
ws.onerror = function (evt) {
    console.log("WebSocketError!");
};