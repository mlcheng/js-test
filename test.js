/***********************************************

  "test.js"

  Created by Michael Cheng on 07/23/2015 10:12
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/**
 * To use custom validation, specify a function with .using()
 * The first parameter is the expected value
 * The second parameter is the actual value
 *
 * See Test.ValidationFunction for built-in examples
 */
function Test(message) {

	// Exposed methods
	var exports = {};

	/**
	 * The validation function to use for comparing results
	 * @type {Function}
	 */
	var _validationFunction;

	function UnitTest(actualResult) {
		var exports = {};

		/**
		 * The main comparison function
		 * @param  {Object} expectedResult The expected result
		 */
		exports.to = expectedResult => {
			Promise.resolve(actualResult).then((result) => {
				Test.prototype.showResult(message, expectedResult, result, _validationFunction);
			});
		};

		exports.toBe = exports.to;

		exports.toHave = exports.to;

		exports.is = exports.to;

		return exports;
	}

	/**
	 * Set a validation function to use
	 * @param  {Function} _validationFunction The validation function to use
	 * @return {Object}                     The Test object for chaining
	 */
	exports.using = validationFunction => {
		_validationFunction = validationFunction;
		return exports;
	};

	/**
	 * Perform a function before testing the result
	 * @param  {Function} what The function to perform
	 * @return {Object}      The Test object for chaining
	 */
	exports.do = what => {
		if(typeof what === 'function') {
			what();
		}
		return exports;
	};

	/**
	 * Specify what to test
	 * @param  {Object} what What to test
	 * @return {UnitTest}      Returns a UnitTest where test result can be found
	 */
	exports.expect = what => new UnitTest(what);

	// Alias for expect
	exports.assert = exports.expect;

	return exports;
}

/**
 * Validation functions for custom tests
 * @type {Object}
 */
Test.ValidationFunction = {
	EQUALS: (e, a) => e === a,
	NOT_EQUALS: (e, a) => e !== a,
	CONTAINS: (e, a) => !!~a.indexOf(e),

	ARRAY_SHALLOW: function(e, a) {
		var i = e.length;
		if(a.length !== i) return false;
		while(i--) {
			if(a[i] !== e[i]) return false;
		}
		return true;
	},
	
	OBJECT_DEEP: function(e, a) {
		// http://stackoverflow.com/a/16788517/4230736
		if(e == null || a == null) return e === a;
		if(e.constructor !== a.constructor) return false;
		if(e instanceof Function) return e === a;
		if(e instanceof RegExp) return e === a;
		if(e === a || e.valueOf() === a.valueOf()) return true;
		if(Array.isArray(e) && e.length !== a.length) return false;
		if(e instanceof Date) return false;
		if(!(e instanceof Object)) return false;
		if(!(a instanceof Object)) return false;

		var level = Object.keys(e);
		return Object.keys(a).every(k => ~level.indexOf(k)) &&
			level.every(k => Test.ValidationFunction.OBJECT_DEEP(e[k], a[k]));
	}
};

Test.Console = {
	CONSOLE: Symbol('console'),
	TERMINAL: Symbol('terminal')
};

/**
 * Specifies the output area for the test results
 * @type {Object}
 */
Test.prototype.output = null;

/**
 * Hide tests that passed. In effect, only show test that have failed.
 * This can be set with Test.config
 * @type {Boolean}
 */
Test.prototype.hidePassed = false;

/**
 * Colorize the output in the console. Defaults to true. Use false if in NodeJS environment
 * @type {Boolean}
 */
Test.prototype.colorMethod = Test.Console.CONSOLE;

Test.prototype.showResult = (message, expectedResult, actualResult, validationFunction) => {
	//Default validation function is EQUALS
	var result = Test.prototype.createResult(message, expectedResult, actualResult, validationFunction || Test.ValidationFunction.EQUALS);


	// The test passed and is being hidden by configuration setting
	if(result === null) {
		return;
	}


	if(!Test.prototype.output) {
		// Output to console
		if(Test.prototype.colorMethod === Test.Console.CONSOLE) {
			console.log(`%c${result.result}`, `
				color: ${result.bgColor};
				text-shadow: 0 0 1px rgba(0, 0, 0, .2);
				${!result.passed ? 'font-size: 150%; font-weight: bold;' : ''}
			`);
		} else {
			// Output to terminal, NodeJS environment
			var colors = {};
			if(result.passed) {
				colors.bg = '\x1b[49m';
				colors.fg = '\x1b[92m';
			} else {
				colors.bg = '\x1b[101m';
				colors.fg = '\x1b[93m';
			}
			console.log(
				`${colors.bg}${colors.fg}${result.result}\x1b[0m`
			);
		}
	} else {
		Test.prototype.output.appendChild(result.result);
	}
};

Test.prototype.getResult = (validationFunction, expectedResult, actualResult) => validationFunction.call(this, expectedResult, actualResult);

Test.prototype.createResult = (message, expectedResult, actualResult, validationFunction) => {
	var passed = Test.prototype.getResult(validationFunction, expectedResult, actualResult) === true;

	// The config wants passed tests to be hidden
	if(Test.prototype.hidePassed && passed) {
		return null;
	}

	var strings = Test.prototype.output ? {
		wrapperBegin: '<strong>',
		wrapperEnd: '</strong>',
		newLine: '<br>',
		separator: ''
	} : {
		wrapperBegin: '"',
		wrapperEnd: '"',
		newLine: '\n >> ',
		separator: '-------------------------------------\n'
	};

	var customValidationFunction = '';
	if(validationFunction !== Test.ValidationFunction.EQUALS) {
		customValidationFunction = ' (using custom validation function)';
	}


	var result = `${strings.separator}Testing: ${message}${customValidationFunction}${strings.newLine}`;
	var bgColor;
	if(passed) {
		result += '[✔] Passed!';
		bgColor = '#c8e6c9';
	} else {
		result += `[✖] Failed. Expected ${strings.wrapperBegin}${expectedResult}${strings.wrapperEnd} (${typeof expectedResult}), got ${strings.wrapperBegin}${actualResult}${strings.wrapperEnd} (${typeof actualResult}) instead.`;
		bgColor = '#ff8a80';
	}

	if(Test.prototype.output) {
		var fragment = document.createElement('div');
		Test.prototype.stylize(fragment, {
			'line-height': '1.5em',
			'margin': '0.5em 0',
			'padding': '0.5em',
			'background': bgColor
		});
		fragment.insertAdjacentHTML('beforeend', result);
		result = fragment;
	}

	return { result, passed, bgColor };
};

Test.prototype.stylize = function(element, styles) {
	Object.keys(styles).forEach(function(style) {
		element.style[style] = styles[style];
	});
};

Test.config = (function() {
	var exports = {};

	exports.output = where => {
		if(where instanceof HTMLElement) {
			Test.prototype.output = where;
		}
	};

	exports.hidePassed = hide => {
		Test.prototype.hidePassed = hide;
		if(hide) {
			console.warn('Passed tests are hidden!');
		}
	};

	exports.colorMethod = method => {
		Test.prototype.colorMethod = method;
	};

	return exports;
})();


// Used for creating tests, in Node environment
if(typeof module !== 'undefined') {
	/* globals module, require */
	Test.config.colorMethod(Test.Console.TERMINAL);

	const fs = require('fs');
	const vm = require('vm');

	/**
	 * Read a file and inject it into tests using Node vm
	 * @param  {String} context The path to the file, usually __dirname
	 * @param  {String} relPath Relative path from the test file to the file to include
	 */
	const inject = (context, relPath) => {
		const PATH = `${context}/${relPath}`;
		vm.runInThisContext(fs.readFileSync(PATH, 'utf8'), PATH);
	};

	module.exports = { Test, inject };
}