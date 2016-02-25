if (typeof monitor == 'undefined' || !monitor) monitor = {};

monitor = {
    initWS: function () {
        var ws = new WebSocket("ws://localhost:2333/", "echo-protocol");
        ws.onopen = function () {
            console.log("open");
            ws.send("client: hello!");
        };
        ws.onmessage = function (evt) {
            $('.main samp').append(evt.data);
        };
        ws.onclose = function (evt) {
            $('.main samp').append("WebSocketClosed!");
        };
        ws.onerror = function (evt) {
            $('.main samp').append("WebSocketError!");
        };
    },
    staticScroll: function () {//todo: staticScroll need todo
        $('div.main').on('scroll', function () {
            console.log('scrollTop===>' + $('div.main').scrollTop() + '  ===>' + $('div.main').height());
            if ($('div.main').scrollTop() == $('div.main').height()) {
                //$('body').scrollTop(0, $('body').height());
            }
        });

    },
    initEvents: function () {
        this.initWS();
        this.staticScroll();
    }
};

$(function () {
    monitor.initEvents();
});