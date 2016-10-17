var TextTrackRenderer =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var TextTrackRenderer = function TextTrackRenderer() {
	  var div = void 0,
	      track = void 0;
	
	  var attach = function attach(element) {
	    if (element.tagName) div = element;else console.log(div + ' is not an HTML div container');
	  };
	
	  var addTextTrack = function addTextTrack(obj) {
	    if (div == null) console.log('attach div container using .attach() first');
	    if (obj == null) console.log('please add track first');else {
	      track = obj;
	      if (isElement(track)) loadTrack(track, track.track);else loadTrack(document.querySelector('track'), track); // <-- This should be a more precise selector
	    }
	  };
	
	  var loadTrack = function loadTrack(elem, obj) {
	    var trackElem = elem,
	        trackObj = obj;
	    if (trackElem.readyState == 2) renderCues(trackObj);else if (trackElem.addEventListener) trackElem.addEventListener('load', function () {
	      loadTrack(trackElem, trackObj);
	    }, false);else trackElem.attachEvent('onload', function () {
	      loadTrack(trackElem, trackObj);
	    });
	  };
	
	  var renderCues = function renderCues(obj) {
	    var trackObj = obj;
	    if ((typeof trackObj === 'undefined' ? 'undefined' : _typeof(trackObj)) !== 'object') console.log('The ' + (typeof trackObj === 'undefined' ? 'undefined' : _typeof(trackObj)) + ' "' + trackObj + '" is not a valid track');else {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = trackObj.cues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _cue = _step.value;
	          div.innerHTML = div.innerHTML + ('<span>' + _cue.text + '</span>');
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  };
	
	  var isElement = function isElement(obj) {
	    return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	  };
	
	  return {
	    attach: attach,
	    addTextTrack: addTextTrack
	  };
	};
	
	module.exports = TextTrackRenderer;

/***/ }
/******/ ]);
//# sourceMappingURL=texttrackrenderer.js.map