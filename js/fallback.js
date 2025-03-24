// Polyfills for older browsers
if (!Object.entries) {
    Object.entries = function(obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i);
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };
}

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('"this" is null or undefined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return false;
        }
        var n = fromIndex | 0;
        var k = Math.max(n >= 0 ? n : len + n, 0);
        while (k < len) {
            if (o[k] === searchElement) {
                return true;
            }
            k++;
        }
        return false;
    };
}

// Promise polyfill for older browsers
if (!window.Promise) {
    window.Promise = function(executor) {
        var self = this;
        var state = 'pending';
        var value = null;
        var callbacks = [];

        this.then = function(onFulfilled, onRejected) {
            return new Promise(function(resolve, reject) {
                handle({
                    onFulfilled: onFulfilled || null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        };

        function handle(callback) {
            if (state === 'pending') {
                callbacks.push(callback);
            } else {
                var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
                if (cb === null) {
                    cb = state === 'fulfilled' ? callback.resolve : callback.reject;
                    cb(value);
                } else {
                    try {
                        var ret = cb(value);
                        callback.resolve(ret);
                    } catch (e) {
                        callback.reject(e);
                    }
                }
            }
        }

        function resolve(newValue) {
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function') && typeof newValue.then === 'function') {
                doResolve(newValue.then.bind(newValue), resolve, reject);
            } else {
                state = 'fulfilled';
                value = newValue;
                executeCallbacks();
            }
        }

        function reject(newValue) {
            state = 'rejected';
            value = newValue;
            executeCallbacks();
        }

        function executeCallbacks() {
            setTimeout(function() {
                callbacks.forEach(handle);
                callbacks = null;
            }, 0);
        }

        function doResolve(fn, onFulfilled, onRejected) {
            var done = false;
            try {
                fn(function(value) {
                    if (done) return;
                    done = true;
                    onFulfilled(value);
                }, function(reason) {
                    if (done) return;
                    done = true;
                    onRejected(reason);
                });
            } catch (ex) {
                if (done) return;
                done = true;
                onRejected(ex);
            }
        }

        executor(resolve, reject);
    };
}

// setTimeout fallback for older browsers
if (!window.setTimeout) {
    window.setTimeout = function(callback, delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
        callback();
    };
}

// Error boundary for unhandled errors
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};

// Touch event support for mobile devices
function addTouchSupport(element, callback) {
    if (element) {
        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
            callback(e);
        }, false);
    }
}

// Initialize touch support for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-items');
    const selectButtons = document.querySelectorAll('.select-btn');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    menuItems.forEach(item => {
        addTouchSupport(item, function(e) {
            handleMenuClick(item, menuItems, document.querySelectorAll('.content'));
        });
    });

    selectButtons.forEach(button => {
        addTouchSupport(button, function(e) {
            handleSelectClick(button, selectButtons, document.querySelectorAll('.floor_content'));
        });
    });

    accordionHeaders.forEach(header => {
        addTouchSupport(header, function(e) {
            handleAccordionClick(header);
        });
    });
});
