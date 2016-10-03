"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};window.require=function e(t,n,r){function o(u,c){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[u]={exports:{}};t[u][0].call(p.exports,function(e){var n=t[u][1][e];return o(n?n:e)},p,p.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){},{}],2:[function(e,t,n){var r=[].indexOf;t.exports=function(e,t){if(r)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}},{}],3:[function(require,module,exports){function Context(){}var indexOf=require("indexof"),Object_keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var n in e)t.push(n);return t},forEach=function(e,t){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;n++)t(e[n],n,e)},defineProp=function(){try{return Object.defineProperty({},"_",{}),function(e,t,n){Object.defineProperty(e,t,{writable:!0,enumerable:!1,configurable:!0,value:n})}}catch(e){return function(e,t,n){e[t]=n}}}(),globals=["Array","Boolean","Date","Error","EvalError","Function","Infinity","JSON","Math","NaN","Number","Object","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","eval","isFinite","isNaN","parseFloat","parseInt","undefined","unescape"];Context.prototype={};var Script=exports.Script=function(e){return this instanceof Script?void(this.code=e):new Script(e)};Script.prototype.runInContext=function(e){if(!(e instanceof Context))throw new TypeError("needs a 'context' argument.");var t=document.createElement("iframe");t.style||(t.style={}),t.style.display="none",document.body.appendChild(t);var n=t.contentWindow,r=n.eval,o=n.execScript;!r&&o&&(o.call(n,"null"),r=n.eval),forEach(Object_keys(e),function(t){n[t]=e[t]}),forEach(globals,function(t){e[t]&&(n[t]=e[t])});var i=Object_keys(n),u=r.call(n,this.code);return forEach(Object_keys(n),function(t){(t in e||indexOf(i,t)===-1)&&(e[t]=n[t])}),forEach(globals,function(t){t in e||defineProp(e,t,n[t])}),document.body.removeChild(t),u},Script.prototype.runInThisContext=function(){return eval(this.code)},Script.prototype.runInNewContext=function(e){var t=Script.createContext(e),n=this.runInContext(t);return forEach(Object_keys(t),function(n){e[n]=t[n]}),n},forEach(Object_keys(Script.prototype),function(e){exports[e]=Script[e]=function(t){var n=Script(t);return n[e].apply(n,[].slice.call(arguments,1))}}),exports.createScript=function(e){return exports.Script(e)},exports.createContext=Script.createContext=function(e){var t=new Context;return"object"===("undefined"==typeof e?"undefined":_typeof(e))&&forEach(Object_keys(e),function(n){t[n]=e[n]}),t}},{indexof:2}],"iqwerty-test":[function(e,t,n){function r(e){function t(t){var o={};return o.to=function(o){Promise.resolve(t).then(function(t){r.prototype.showResult(e,o,t,n)})},o.toBe=o.to,o.toHave=o.to,o.is=o.to,o.equals=o.to,o}var n,o={};return o.using=function(e){return n=e,o},o.do=function(e){return"function"==typeof e&&e(),o},o.expect=function(e){return new t(e)},o.assert=o.expect,o}var o=this;r.ValidationFunction={EQUALS:function(e,t){return e===t},NOT_EQUALS:function(e,t){return e!==t},CONTAINS:function(e,t){return!!~t.indexOf(e)},ARRAY_SHALLOW:function(e,t){var n=e.length;if(t.length!==n)return!1;for(;n--;)if(t[n]!==e[n])return!1;return!0},OBJECT_DEEP:function(e,t){if(null==e||null==t)return e===t;if(e.constructor!==t.constructor)return!1;if(e instanceof Function)return e===t;if(e instanceof RegExp)return e===t;if(e===t||e.valueOf()===t.valueOf())return!0;if(Array.isArray(e)&&e.length!==t.length)return!1;if(e instanceof Date)return!1;if(!(e instanceof Object))return!1;if(!(t instanceof Object))return!1;var n=Object.keys(e);return Object.keys(t).every(function(e){return~n.indexOf(e)})&&n.every(function(n){return r.ValidationFunction.OBJECT_DEEP(e[n],t[n])})}},r.Console={CONSOLE:Symbol("console"),TERMINAL:Symbol("terminal")},r.prototype.output=null,r.prototype.hidePassed=!1,r.prototype.colorMethod=r.Console.CONSOLE,r.prototype.showResult=function(e,t,n,o){var i=r.prototype.createResult(e,t,n,o||r.ValidationFunction.EQUALS);if(null!==i)if(r.prototype.output)r.prototype.output.appendChild(i.result);else if(r.prototype.colorMethod===r.Console.CONSOLE)console.log("%c"+i.result,"\n\t\t\t\tcolor: "+i.bgColor+";\n\t\t\t\ttext-shadow: 0 0 1px rgba(0, 0, 0, .2);\n\t\t\t\t"+(i.passed?"":"font-size: 150%; font-weight: bold;")+"\n\t\t\t");else{var u={};i.passed?(u.bg="[49m",u.fg="[92m"):(u.bg="[101m",u.fg="[93m"),console.log(""+u.bg+u.fg+i.result+"[0m")}},r.prototype.getResult=function(e,t,n){return e.call(o,t,n)},r.prototype.createResult=function(e,t,n,o){var i=function(e){return"object"===("undefined"==typeof e?"undefined":_typeof(e))?JSON.stringify(e,null,4):e},u=r.prototype.getResult(o,t,n)===!0;if(r.prototype.hidePassed&&u)return null;var c=r.prototype.output?{wrapperBegin:"<strong>",wrapperEnd:"</strong>",newLine:"<br>",separator:""}:{wrapperBegin:'"',wrapperEnd:'"',newLine:"\n >> ",separator:"-------------------------------------\n"},f="";o!==r.ValidationFunction.EQUALS&&(f=" (using custom validation function)");var a,p=c.separator+"Testing: "+e+f+c.newLine;if(u?(p+="[✔] Passed!",a="#c8e6c9"):(p+="[✖] Failed. Expected "+c.wrapperBegin+i(t)+c.wrapperEnd+" ("+("undefined"==typeof t?"undefined":_typeof(t))+"), got "+c.wrapperBegin+i(n)+c.wrapperEnd+" ("+("undefined"==typeof n?"undefined":_typeof(n))+") instead.",a="#ff8a80"),r.prototype.output){var s=document.createElement("div");r.prototype.stylize(s,{"line-height":"1.5em",margin:"0.5em 0",padding:"0.5em",background:a}),s.insertAdjacentHTML("beforeend",p),p=s}return{result:p,passed:u,bgColor:a}},r.prototype.stylize=function(e,t){Object.keys(t).forEach(function(n){e.style[n]=t[n]})},r.config=function(){var e={};return e.output=function(e){e instanceof HTMLElement&&(r.prototype.output=e)},e.hidePassed=function(e){r.prototype.hidePassed=e,e&&console.warn("Passed tests are hidden!")},e.colorMethod=function(e){r.prototype.colorMethod=e},e}(),"undefined"!=typeof t&&!function(){r.config.colorMethod(r.Console.TERMINAL);var n=e("vm"),o=function(e,t){var r=e+"/"+t;n.runInThisContext(fs.readFileSync(r,"utf8"),r)};t.exports={Test:r,inject:o}}()},{fs:1,vm:3}]},{},["iqwerty-test"]);