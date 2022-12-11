 var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
eventer(messageEvent, function (e) {
var message = e.data;
    console.log(message);
}, false);