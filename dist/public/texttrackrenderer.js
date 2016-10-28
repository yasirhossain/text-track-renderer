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
	
	  var setTextTrack = function setTextTrack(obj) {
	    if (div == null) console.log('attach div container using .attach() first');
	    if (obj == null) {
	      div.innerHTML = '';
	      console.log('please add track first');
	    } else {
	      if (isElement(obj)) loadTrack(obj.track);else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object') loadTrack(obj);else console.log('the ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) + ' ' + obj + ' is not a valid track object');
	    }
	  };
	
	  var loadTrack = function loadTrack(obj) {
	    track = obj;
	    renderStyles();
	    track.oncuechange = function () {
	      return renderCues();
	    };
	  };
	
	  var renderCues = function renderCues() {
	    var cueHeight = div.offsetHeight / 15,
	        cueFontSize = cueHeight * .8,
	        cueDefStyles = 'height:' + cueHeight + 'px;font-size:' + cueFontSize + 'px;',
	        cuePosition = void 0;
	
	    div.childNodes[1].innerHTML = '';
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = track.activeCues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var cue = _step.value;
	
	        var cueText = cue.text.replace(/(?:\r\n|\r|\n)/g, '<br />');
	
	        if (typeof cue.line == 'number' && cue.line !== 0) if (cue.align == 'middle') cuePosition = 'top:' + (cueHeight * cue.line - cueHeight) + 'px;';else cuePosition = 'top:' + (cueHeight * cue.line - cueHeight) + 'px;';
	
	        div.childNodes[1].innerHTML += '<span class="ttrCue ' + cue.align + '" style="' + cueDefStyles + cuePosition + '">' + cueText + '</span>';
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
	  };
	
	  var isElement = function isElement(obj) {
	    return;
	    (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	  };
	
	  var renderStyles = function renderStyles() {
	    var cueStyleElem = '<style>\n      .ttrCues {\n        height:' + div.offsetHeight + 'px;\n        width:' + div.offsetWidth + 'px;\n        display:table-cell;\n        vertical-align:bottom;\n        font-family: Helvetica, sans;\n      }\n      .ttrCues .ttrCue {\n        text-align:center;\n        position:absolute;\n        bottom:0;\n        color:#fff;\n        background-color:#000;\n      }\n      .ttrCues .ttrCue:after{display:block;content:"";background-color:transparent;}\n      .ttrCues .ttrCue:last-child:after{content:initial;}\n      .ttrCues .ttrCue.start, .ttrCues span.left {left:0;right:auto;}\n      .ttrCues .ttrCue.right{left:auto;right:0;}\n      .ttrCues .ttrCue.middle{left:50%;transform:translateX(-50%);}\n    </style>',
	        cueContainer = '<div class="ttrCues"></div>';
	
	    div.style.position = 'relative';
	    div.innerHTML = cueStyleElem + cueContainer;
	  };
	
	  return {
	    attach: attach,
	    setTextTrack: setTextTrack
	  };
	};
	
	module.exports = TextTrackRenderer;

/***/ }
/******/ ]);
//# sourceMappingURL=texttrackrenderer.js.map