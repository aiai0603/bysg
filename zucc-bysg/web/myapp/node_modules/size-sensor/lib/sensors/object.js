"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSensor = void 0;

var _debounce = _interopRequireDefault(require("../debounce"));

var _constant = require("../constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hustcc on 18/6/9.
 * Contract: i@hust.cc
 */
var createSensor = function createSensor(element) {
  var sensor = undefined; // callback

  var listeners = [];
  /**
   * create object DOM of sensor
   * @returns {HTMLObjectElement}
   */

  var newSensor = function newSensor() {
    // adjust style
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    var obj = document.createElement('object');

    obj.onload = function () {
      obj.contentDocument.defaultView.addEventListener('resize', resizeListener); // 直接触发一次 resize

      resizeListener();
    };

    obj.setAttribute('style', _constant.SensorStyle);
    obj.setAttribute('class', _constant.SensorClassName);
    obj.setAttribute('tabindex', _constant.SensorTabIndex);
    obj.type = 'text/html'; // append into dom

    element.appendChild(obj); // for ie, should set data attribute delay, or will be white screen

    obj.data = 'about:blank';
    return obj;
  };
  /**
   * trigger listeners
   */


  var resizeListener = (0, _debounce["default"])(function () {
    // trigger all listener
    listeners.forEach(function (listener) {
      listener(element);
    });
  });
  /**
   * listen with one callback function
   * @param cb
   */

  var bind = function bind(cb) {
    // if not exist sensor, then create one
    if (!sensor) {
      sensor = newSensor();
    }

    if (listeners.indexOf(cb) === -1) {
      listeners.push(cb);
    }
  };
  /**
   * destroy all
   */


  var destroy = function destroy() {
    if (sensor && sensor.parentNode) {
      if (sensor.contentDocument) {
        // remote event
        sensor.contentDocument.defaultView.removeEventListener('resize', resizeListener);
      } // remove dom


      sensor.parentNode.removeChild(sensor); // initial variable

      sensor = undefined;
      listeners = [];
    }
  };
  /**
   * cancel listener bind
   * @param cb
   */


  var unbind = function unbind(cb) {
    var idx = listeners.indexOf(cb);

    if (idx !== -1) {
      listeners.splice(idx, 1);
    } // no listener, and sensor is exist
    // then destroy the sensor


    if (listeners.length === 0 && sensor) {
      destroy();
    }
  };

  return {
    element: element,
    bind: bind,
    destroy: destroy,
    unbind: unbind
  };
};

exports.createSensor = createSensor;