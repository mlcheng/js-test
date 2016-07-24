"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};window.require=function e(t,n,o){function r(c,u){if(!n[c]){if(!t[c]){var p="function"==typeof require&&require;if(!u&&p)return p(c,!0);if(i)return i(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var a=n[c]={exports:{}};t[c][0].call(a.exports,function(e){var n=t[c][1][e];return r(n?n:e)},a,a.exports,e,t,n,o)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,t,n){},{}],2:[function(e,t,n){var o=[].indexOf;t.exports=function(e,t){if(o)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}},{}],3:[function(require,module,exports){function Context(){}var indexOf=require("indexof"),Object_keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var n in e)t.push(n);return t},forEach=function(e,t){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;n++)t(e[n],n,e)},defineProp=function(){try{return Object.defineProperty({},"_",{}),function(e,t,n){Object.defineProperty(e,t,{writable:!0,enumerable:!1,configurable:!0,value:n})}}catch(e){return function(e,t,n){e[t]=n}}}(),globals=["Array","Boolean","Date","Error","EvalError","Function","Infinity","JSON","Math","NaN","Number","Object","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","eval","isFinite","isNaN","parseFloat","parseInt","undefined","unescape"];Context.prototype={};var Script=exports.Script=function(e){return this instanceof Script?void(this.code=e):new Script(e)};Script.prototype.runInContext=function(e){if(!(e instanceof Context))throw new TypeError("needs a 'context' argument.");var t=document.createElement("iframe");t.style||(t.style={}),t.style.display="none",document.body.appendChild(t);var n=t.contentWindow,o=n.eval,r=n.execScript;!o&&r&&(r.call(n,"null"),o=n.eval),forEach(Object_keys(e),function(t){n[t]=e[t]}),forEach(globals,function(t){e[t]&&(n[t]=e[t])});var i=Object_keys(n),c=o.call(n,this.code);return forEach(Object_keys(n),function(t){(t in e||indexOf(i,t)===-1)&&(e[t]=n[t])}),forEach(globals,function(t){t in e||defineProp(e,t,n[t])}),document.body.removeChild(t),c},Script.prototype.runInThisContext=function(){return eval(this.code)},Script.prototype.runInNewContext=function(e){var t=Script.createContext(e),n=this.runInContext(t);return forEach(Object_keys(t),function(n){e[n]=t[n]}),n},forEach(Object_keys(Script.prototype),function(e){exports[e]=Script[e]=function(t){var n=Script(t);return n[e].apply(n,[].slice.call(arguments,1))}}),exports.createScript=function(e){return exports.Script(e)},exports.createContext=Script.createContext=function(e){var t=new Context;return"object"===("undefined"==typeof e?"undefined":_typeof(e))&&forEach(Object_keys(e),function(n){t[n]=e[n]}),t}},{indexof:2}],"iqwerty-test":[function(e,t,n){function o(e){function t(t){var r={};return r.to=function(r){Promise.resolve(t).then(function(t){o.prototype.showResult(e,r,t,n)})},r.toBe=r.to,r.toHave=r.to,r.is=r.to,r}var n,r={};return r.using=function(e){return n=e,r},r["do"]=function(e){return"function"==typeof e&&e(),r},r.expect=function(e){return new t(e)},r.assert=r.expect,r}var r=this;o.ValidationFunction={EQUALS:function(e,t){return e===t},NOT_EQUALS:function(e,t){return e!==t},CONTAINS:function(e,t){return!!~t.indexOf(e)}},o.Console={CONSOLE:Symbol("console"),TERMINAL:Symbol("terminal")},o.prototype.output=null,o.prototype.hidePassed=!1,o.prototype.colorMethod=o.Console.CONSOLE,o.prototype.showResult=function(e,t,n,r){var i=o.prototype.createResult(e,t,n,r||o.ValidationFunction.EQUALS);if(null!==i)if(o.prototype.output)o.prototype.output.appendChild(i.result);else if(o.prototype.colorMethod===o.Console.CONSOLE)console.log("%c"+i.result,"\n\t\t\t\tcolor: "+i.bgColor+";\n\t\t\t\ttext-shadow: 0 0 1px rgba(0, 0, 0, .2);\n\t\t\t\t"+(i.passed?"":"font-size: 150%; font-weight: bold;")+"\n\t\t\t");else{var c={};i.passed?(c.bg="[49m",c.fg="[92m"):(c.bg="[101m",c.fg="[93m"),console.log(""+c.bg+c.fg+i.result+"[0m")}},o.prototype.getResult=function(e,t,n){return e.call(r,t,n)},o.prototype.createResult=function(e,t,n,r){var i=o.prototype.getResult(r,t,n)===!0;if(o.prototype.hidePassed&&i)return null;var c=o.prototype.output?{wrapperBegin:"<strong>",wrapperEnd:"</strong>",newLine:"<br>",separator:""}:{wrapperBegin:'"',wrapperEnd:'"',newLine:"\n >> ",separator:"-------------------------------------\n"},u="";r!==o.ValidationFunction.EQUALS&&(u=" (using custom validation function)");var p,f=c.separator+"Testing: "+e+u+c.newLine;if(i?(f+="[✔] Passed!",p="#c8e6c9"):(f+="[✖] Failed. Expected "+c.wrapperBegin+t+c.wrapperEnd+" ("+("undefined"==typeof t?"undefined":_typeof(t))+"), got "+c.wrapperBegin+n+c.wrapperEnd+" ("+("undefined"==typeof n?"undefined":_typeof(n))+") instead.",p="#ff8a80"),o.prototype.output){var a=document.createElement("div");o.prototype.stylize(a,{"line-height":"1.5em",margin:"0.5em 0",padding:"0.5em",background:p}),a.insertAdjacentHTML("beforeend",f),f=a}return{result:f,passed:i,bgColor:p}},o.prototype.stylize=function(e,t){Object.keys(t).forEach(function(n){e.style[n]=t[n]})},o.config=function(){var e={};return e.output=function(e){e instanceof HTMLElement&&(o.prototype.output=e)},e.hidePassed=function(e){o.prototype.hidePassed=e,e&&console.warn("Passed tests are hidden!")},e.colorMethod=function(e){o.prototype.colorMethod=e},e}(),"undefined"!=typeof t&&!function(){o.config.colorMethod(o.Console.TERMINAL);var n=e("fs"),r=e("vm"),i=function(e,t){var o=e+"/"+t;r.runInThisContext(n.readFileSync(o,"utf8"),o)};t.exports={Test:o,inject:i}}()},{fs:1,vm:3}]},{},["iqwerty-test"]);