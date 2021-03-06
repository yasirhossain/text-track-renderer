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
	      track = void 0,
	      scale = 1;
	
	  var attach = function attach(element) {
	    if (element.tagName) {
	      div = element;
	    } else console.log(div + ' is not an HTML div container');
	  };
	
	  var setTextTrack = function setTextTrack(obj) {
	    if (track) resetTrack();
	    if (div == null) console.log('attach div container using .attach() first');
	    if (obj == null) {
	      resetTrack();
	      console.log('please add track first');
	    } else {
	      if (isElement(obj)) loadTrack(obj.track);else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object') loadTrack(obj);else console.log('the ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) + ' ' + obj + ' is not a valid track object');
	    }
	  };
	
	  var loadTrack = function loadTrack(obj) {
	    track = obj;
	    renderStyles();
	    track.addEventListener('cuechange', renderTextTrack);
	  };
	
	  var renderTextTrack = function renderTextTrack() {
	    var cueHeight = div.offsetHeight / 15 * scale,
	        cueFontSize = cueHeight * .8,
	        cueDefStyles = 'height:' + cueHeight + 'px;font-size:' + cueFontSize + 'px;',
	        cuePosition = void 0,
	        cueParentCont = div.childNodes[1];
	
	    cueParentCont.innerHTML = '';
	    cueParentCont.innerHTML = '<div class="ttr-line"></div><div class="ttr-container"></div>';
	
	    var cueDefCont = cueParentCont.childNodes[0],
	        cueLineCont = cueParentCont.childNodes[1];
	
	    for (var i = 0; i < track.activeCues.length; i++) {
	      var cue = track.activeCues[i],
	          cueText = cue.text.replace(/(?:\r\n|\r|\n)/g, '<br />'),
	          cueSpan = '<span class="ttr-cue ttr-' + cue.align + '" style="' + cueDefStyles + '">' + cueText + '</span>';
	
	      if (typeof cue.line !== 'number' || cue.line == -1) cueParentCont.childNodes[1].innerHTML += cueSpan;else {
	        var _cuePosition = 'top:' + (cueHeight * cue.line - cueHeight) + 'px;',
	            _cueSpan = '<span class="ttr-cue ttr-' + cue.align + '" style="' + cueDefStyles + _cuePosition + '">' + cueText + '</span>';
	        if (cue.align == 'middle') cueParentCont.innerHTML += '<div class="ttr-centered">' + _cueSpan + '</div>';else cueParentCont.childNodes[0].innerHTML += _cueSpan;
	      }
	    }
	  };
	
	  var resetTrack = function resetTrack() {
	    div.innerHTML = '';
	    track.removeEventListener('cuechange', renderTextTrack);
	  };
	
	  var layout = function layout() {
	    renderTextTrack();
	  };
	
	  var setScale = function setScale(num) {
	    if (num > 0) {
	      if (num > 2) num = 2;
	      scale = num;
	      renderTextTrack();
	    } else console.log('scale of ' + int + ' needs to be larger than 0');
	  };
	
	  var isElement = function isElement(obj) {
	    return;
	    (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	  };
	
	  var renderStyles = function renderStyles() {
	    var cueStyleElem = '<style>\n      .ttr-cues {\n        width:100%;\n        height:100%;\n        position:absolute;\n        overflow:hidden;\n      }\n      .ttr-cues .ttr-container {\n        position:absolute;\n        z-index:15;\n        bottom:0;\n        width:100%;\n      }\n      .ttr-cues .ttr-line, .ttr-cues .ttr-centered {\n        position:absolute;\n        height:100%;\n        width:100%;\n        top:0;\n        white-space: nowrap;\n      }\n      .ttr-cues .ttr-cue {\n        text-align:center;\n        position:absolute;\n        overflow:hidden;\n      }\n      .ttr-cues .ttr-cue:last-child:after{content:initial;}\n      .ttr-cues .ttr-cue.ttr-start, .ttr-cues span.ttr-left {left:0;right:auto;text-align:left;}\n      .ttr-cues .ttr-cue.ttr-right{left:auto;right:0;text-align:right;}\n\n      .ttr-cues .ttr-container .ttr-cue,\n      .ttr-cues .ttr-centered .ttr-cue {position:relative;}\n\n      .ttr-cues .ttr-container .ttr-cue.ttr-start,\n      .ttr-cues .ttr-container .ttr-cue.ttr-left {float:left;}\n      .ttr-cues .ttr-container .ttr-cue.ttr-right {float:right;}\n    </style>',
	        cueContainer = '<div class="ttr-cues"></div>';
	
	    div.style.position = 'relative';
	    div.innerHTML = cueStyleElem + cueContainer;
	  };
	
	  return {
	    attach: attach,
	    layout: layout,
	    setScale: setScale,
	    setTextTrack: setTextTrack
	  };
	};
	
	module.exports = TextTrackRenderer;

/***/ }
/******/ ]);
//# sourceMappingURL=texttrackrenderer.js.map