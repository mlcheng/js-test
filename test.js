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
	var exports = {};

	/**
	 * The validation function to use for comparing results
	 * @type {Function}
	 */
	var validationFunction;

	/**
	 * Set a validation function to use
	 * @param  {Function} _validationFunction The validation function to use
	 * @return {Object}                     The Test object for chaining
	 */
	exports.using = _validationFunction => {
		validationFunction = _validationFunction;
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

	function UnitTest(actualResult) {
		var exports = {};

		/**
		 * The main comparison function
		 * @param  {Object} expectedResult The expected result
		 */
		exports.to = (expectedResult) => {
			Test.prototype.showResult(message, expectedResult, actualResult, validationFunction);
		};

		exports.toBe = exports.to;

		exports.toHave = exports.to;

		return exports;
	}

	return exports;
}

/**
 * Specifies the output area for the test results
 * @type {Object}
 */
Test.prototype.output = null;

Test.prototype.showResult = (message, expectedResult, actualResult, validationFunction) => {
	//Default validation function is EQUALS
	var result = Test.prototype.createResult(message, expectedResult, actualResult, validationFunction || Test.ValidationFunction.EQUALS);


	if(!Test.prototype.output) {
		console.log(result);
	} else {
		Test.prototype.output.appendChild(result);
	}
};

Test.prototype.createResult = (message, expectedResult, actualResult, validationFunction) => {
	var passed = validationFunction.call(this, expectedResult, actualResult);
	var strings = Test.prototype.output ? {
		wrapperBegin: '<strong>',
		wrapperEnd: '</strong>',
		newLine: '<br>'
	} : {
		wrapperBegin: '"',
		wrapperEnd: '"',
		newLine: '\n  >> '
	};

	var customValidationFunction = '';
	if(validationFunction !== Test.ValidationFunction.EQUALS) {
		customValidationFunction = ' (using custom validation function)';
	}


	var result = `Testing: ${message}${customValidationFunction}${strings.newLine}`;
	var bgColor;
	if(passed) {
		result += '✔ Passed!';
		bgColor = '#c8e6c9';
	} else {
		result += `😫 Failed. Expected ${strings.wrapperBegin}${expectedResult}${strings.wrapperEnd} (${typeof expectedResult}), got ${strings.wrapperBegin}${actualResult}${strings.wrapperEnd} (${typeof actualResult}) instead.`;
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

	passed = null;
	bgColor = null;

	return result;
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

	return exports;
})();

/**
 * Validation functions for custom tests
 * @type {Object}
 */
Test.ValidationFunction = {
	EQUALS: (e, a) => e === a,
	CONTAINS: (e, a) => ~a.indexOf(e)
};