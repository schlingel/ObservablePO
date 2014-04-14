//Copyright 2014 Martin Keiblinger
//
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//limitations under the License.
"use strict";

var module = module || { exports : {} };

var ObservablePO = (function(target) {
    function ObservablePO(data, subscribers) {
        if(isNullOrPrimitive(data)) {
            throw {
                name : 'Illegal argument exception',
                cause : 'ObservablePO only accepts objects as arguments.'
            };
        }

        this.data = data;
        this.subscribers = [].concat(subscribers || []);

        setupGetterSetter(this, this.data);
    }

    ObservablePO.prototype.addSubscriber = function(subscriber) {
        this.subscribers.push(subscriber);
    };

    ObservablePO.prototype.get = function(key) {
        var self = this,
            isValidData = !!this.data;

        if(isValidData) {
            var dataElem = this.data[key];

            if(isNullOrPrimitive(dataElem)) {
                return dataElem;
            } else {
                return new ObservablePO(dataElem, [function(oldVal, newVal) { self.notify(oldVal, newVal); }]);
            }
        }

        return undefined;
    };

    ObservablePO.prototype.set = function(key, item) {
        var value = this.data[key];
        this.data[key] = item;
        this.notify(value, item);
    };

    ObservablePO.prototype.notify = function(oldVal, newVal) {
        var hasSubscribers = !!this.subscribers && this.subscribers.length > 0;

        if(hasSubscribers) {
            this.subscribers.forEach(function(subscriber) {
               var isSubscriberFct = (typeof subscriber == 'function');

               if(isSubscriberFct) {
                   subscriber();
               }
            });
        }
    };


    function isNullOrPrimitive(data) {
        return (data == null) || !isNaN(data) || (typeof data == 'string') || (data === undefined);
    }

    function setupGetterSetter(instanceObj, data) {
        for(var key in data) {
            if(data.hasOwnProperty(key)) {
                var firstChar = key.charAt(0).toUpperCase(),
                    name = firstChar + key.substr(1);

                instanceObj['get' + name] = getGetterFct(instanceObj, key);
                instanceObj['set' + name] = getSetterFct(instanceObj, key);
            }
        }
    };

    function getGetterFct(instanceObj, key) {
        return function() {
            return instanceObj.get(key);
        };
    };

    function getSetterFct(instanceObj, key) {
        return function(value) {
            instanceObj.set(key, value);
        };
    };

    module.exports.ObservablePO = ObservablePO;
    target = target || {};
    target = target.ObservablePO = ObservablePO;

    return ObservablePO;
})();
