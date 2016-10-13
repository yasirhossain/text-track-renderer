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
	
	var TextTrackRenderer = function TextTrackRenderer() {
	  var divElement = void 0,
	      trackElement = void 0;
	
	  function attach(div) {
	    if (div.tagName) divElement = div;else console.log(div + ' is not an HTML div container');
	  }
	
	  function addTextTrack(track) {
	    if (divElement == null) console.log('attach div container using .attach() first');else {
	      if (track.tagName) {
	        trackElement = track;
	        trackElement.addEventListener('load', function () {
	          var textTrack = this.track;
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;
	
	          try {
	            for (var _iterator = textTrack.cues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var cue = _step.value;
	
	              layoutManager(cue);
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
	        });
	      } else console.log(track + ' is not an HTML track container');
	    }
	  }
	
	  function layoutManager(cue) {
	    divElement.innerHTML = divElement.innerHTML + ('<span>' + cue.text + '</span>');
	    console.log(cue);
	  }
	
	  return {
	    attach: attach,
	    addTextTrack: addTextTrack
	  };
	};
	
	module.exports = TextTrackRenderer;

/***/ }
/******/ ]);
//# sourceMappingURL=texttrackrenderer.js.map