(()=>{var e={318:e=>{e.exports=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports},445:(e,t,s)=>{"use strict";var r=s(318);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(s(539));const i="1.8.9-20231030181038-d03dce9",a={OGVDemuxerOgg:"ogv-demuxer-ogg.js",OGVDemuxerWebM:"ogv-demuxer-webm.js",OGVDecoderAudioOpus:"ogv-decoder-audio-opus.js",OGVDecoderAudioVorbis:"ogv-decoder-audio-vorbis.js",OGVDecoderVideoTheora:"ogv-decoder-video-theora.js",OGVDecoderVideoTheoraSIMD:"ogv-decoder-video-theora-simd.js",OGVDecoderVideoVP8:"ogv-decoder-video-vp8.js",OGVDecoderVideoVP8SIMD:"ogv-decoder-video-vp8-simd.js",OGVDecoderVideoVP9:"ogv-decoder-video-vp9.js",OGVDecoderVideoVP9SIMD:"ogv-decoder-video-vp9-simd.js",OGVDecoderVideoVP9SIMDMT:"ogv-decoder-video-vp9-simd-mt.js",OGVDecoderVideoAV1:"ogv-decoder-video-av1.js",OGVDecoderVideoAV1SIMD:"ogv-decoder-video-av1-simd.js",OGVDecoderVideoAV1MT:"ogv-decoder-video-av1-mt.js",OGVDecoderVideoAV1SIMDMT:"ogv-decoder-video-av1-simd-mt.js"};var d=class OGVLoaderBase{constructor(){this.base=this.defaultBase()}defaultBase(){}wasmSupported(){return o.default.wasmSupported()}scriptForClass(e){return a[e]}urlForClass(e){let t=this.scriptForClass(e);if(t)return this.urlForScript(t);throw new Error("asked for URL for unknown class "+e)}urlForScript(e){if(e){let t=this.base;return void 0===t?t="":t+="/",t+e+"?version="+encodeURIComponent(i)}throw new Error("asked for URL for unknown script "+e)}loadClass(e,t,s){s=s||{};let r=this.getGlobal(),o=this.urlForClass(e),classWrapper=t=>((t=t||{}).locateFile=e=>"data:"===e.slice(0,5)?e:this.urlForScript(e),t.mainScriptUrlOrBlob=this.scriptForClass(e)+"?version="+encodeURIComponent(i),r[e](t));"function"==typeof r[e]?t(classWrapper):this.loadScript(o,(()=>{t(classWrapper)}))}};t.default=d},713:(e,t,s)=>{"use strict";var r=s(318);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(s(445));class OGVLoaderWorker extends o.default{loadScript(e,t){importScripts(e),t()}getGlobal(){return self}}var i=new OGVLoaderWorker;t.default=i},607:(e,t,s)=>{"use strict";var r=s(318);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=new(r(s(172)).default)(["loadedMetadata","audioFormat","audioBuffer","cpuTime"],{init:function init(e,t){this.target.init(t)},processHeader:function processHeader(e,t){this.target.processHeader(e[0],(e=>{t([e])}))},processAudio:function processAudio(e,t){this.target.processAudio(e[0],(e=>{t([e])}))}});t.default=o},172:(e,t,s)=>{"use strict";var r=s(318);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(s(713));s.g.OGVLoader=o.default;var i=class OGVWorkerSupport{constructor(e,t){this.propList=e,this.handlers=t,this.transferables=(()=>{let e=new ArrayBuffer(1024),t=new Uint8Array(e);try{return postMessage({action:"transferTest",bytes:t},[e]),!e.byteLength}catch(e){return!1}})(),this.target=null,this.sentProps={},this.pendingEvents=[],this.handlers.construct=(e,t)=>{let s=e[0],r=e[1];o.default.loadClass(s,(e=>{e(r).then((e=>{for(this.target=e,t();this.pendingEvents.length;)this.handleEvent(this.pendingEvents.shift())}))}))},addEventListener("message",(e=>{this.workerOnMessage(e)}))}handleEvent(e){this.handlers[e.action].call(this,e.args,(t=>{t=t||[];let s={},r=[];this.propList.forEach((e=>{let t=this.target[e];if(this.sentProps[e]!==t)if(this.sentProps[e]=t,"duration"==e&&isNaN(t)&&isNaN(this.sentProps[e]));else if("audioBuffer"==e){if(s[e]=t,t)for(let e=0;e<t.length;e++)r.push(t[e].buffer)}else"frameBuffer"==e?(s[e]=t,t&&(r.push(t.y.bytes.buffer),r.push(t.u.bytes.buffer),r.push(t.v.bytes.buffer))):s[e]=t}));let o={action:"callback",callbackId:e.callbackId,args:t,props:s};this.transferables?postMessage(o,r):postMessage(o)}))}workerOnMessage(e){let t=e.data;t&&"object"==typeof t&&("transferTest"==t.action||("string"!=typeof t.action||"string"!=typeof t.callbackId||"object"!=typeof t.args?console.log("invalid message data",t):t.action in this.handlers?"construct"==t.action||this.target?this.handleEvent(t):this.pendingEvents.push(t):console.log("invalid message action",t.action)))}};t.default=i},539:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=new class WebAssemblyChecker{constructor(){this.tested=!1,this.testResult=void 0}wasmSupported(){if(!this.tested){try{"object"==typeof WebAssembly?this.testResult=function testSafariWebAssemblyBug(){let e=new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11]),t=new WebAssembly.Module(e);return 0!==new WebAssembly.Instance(t,{}).exports.test(4)}():this.testResult=!1}catch(e){console.log("Exception while testing WebAssembly",e),this.testResult=!1}this.tested=!0}return this.testResult}};t.default=s}},t={};function __webpack_require__(s){var r=t[s];if(void 0!==r)return r.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,__webpack_require__),o.exports}__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{"use strict";__webpack_require__(318)(__webpack_require__(607))})()})();