
var EventFactory = function () {
    var listeners = [];
    return {
        addListener: function (listener) {
            listeners.push(listener); 
        },
        removeListener: function (listener) {
            var key = listeners.indexOf(listener);
            if (key !== -1) unset(listeners[key]);
        },
        dispatch: function (args) {
            var args = args || {};
            listeners.forEach(function (callback) {
                callback(args);
            });
        }
    }
};

/*how to use EventFactory
var myEvent = EventFactory();
myEvent.addListener(function(e){ console.log('hello ' + e); });
myEvent.dispatch("world");*/
