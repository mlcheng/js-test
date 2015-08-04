/***********************************************

  "test.js"

  Created by Michael Cheng on 07/23/2015 10:12
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

"use strict";

function Test(message) {
	/**
	 * An object representing a unit test. The Unit takes in the actual result, and compares it to the expected result.
	 * @param {Object} actualResult The actual result of the unit test
	 */
	function Unit(actualResult) {
		/**
		 * Checks whether or not the actual result is equal to the expected result.
		 * @param  {Object}  expectedResult The expected result of the unit test
		 * @return {Boolean}                Returns true if the unit test passes. False otherwise
		 */
		function is(expectedResult) {
			return Test.prototype.showTestResult(message, expectedResult, actualResult, Test.prototype.type.typeIs);
		};

		function contains(expectedResult) {
			//you are here
			return Test.prototype.showTestResult(message, expectedResult, actualResult, Test.prototype.type.typeContains);
		};

		return {
			is: is,
			contains: contains
		};
	};


	/**
	 * Defines an expression and evaluates its result
	 * @param  {Object} what An expression to evaluate
	 * @return {Unit}        A Unit test.
	 */
	function expect(what) {
		return new Unit(what);
	};

	return {
		expect: expect
	};
};

/**
 * Specifies the HTML element where the test result should be output to. If null, the result is output to the console.
 * @type {Object}
 */
Test.prototype.output = null;

/**
 * An object that allows configuration of the Test prototype
 * @type {Object}
 */
Test.config = (function() {
	/**
	 * Controls the output of the Test.
	 * @param  {Object} where The HTML element, or null if the console output is desired.
	 */
	return {
		output: function(where) {
			if(where instanceof HTMLElement) {
				Test.prototype.output = where;
			}
		}
	}
})();


/**
 * Get the result of the Test
 * @param  {Object}  expected The expected result
 * @param  {Object}  actual   The actual result
 * @param  {String}  type     The type of Test to perform
 * @return {Boolean}          True if the Test passes, false otherwise
 */
Test.prototype.getResult = function(expected, actual, type) {
	var passed;

	if(type === Test.prototype.type.typeIs) {
		passed = expected === actual;
	} else if(type === Test.prototype.type.typeContains) {
		passed = actual.indexOf(expected) > -1;
	}
	return passed;
}

/**
 * Create the result of the Test based on the expected result and the actual result
 * @param  {String} message  A description of the unit test
 * @param  {Object} expected The expected result of the unit test
 * @param  {Object} actual   The actual result of the test
 * @param  {String} type     The type of test to perform; use the Test.prototype.type constants
 * @return {Object}          Returns the result as an HTML element (if specified), or a String (if null)
 */
Test.prototype.createResult = function(message, expected, actual, type) {


	var passed = Test.prototype.getResult(expected, actual, type);


	var wrapper_begin, wrapper_end, nl, log, out;

	if(Test.prototype.output === null) {
		wrapper_begin = "\"";
		wrapper_end = "\"";
		nl = "\n>> ";
	} else {
		wrapper_begin = "<strong>";
		wrapper_end = "</strong>";
		nl = "<br>";
	}

	out = document.createElement("div");
	Test.prototype.stylize(out, {
		"line-height": "1.5em",
		"margin": "0.5em 0",
		"padding": "0.5em"
	});

	log = "Testing: " + message + nl;
	if(passed) {
		log += "Passed!";
		Test.prototype.stylize(out, {
			"background": "#c5e1a5"
		});
	} else {
		log += "Failed. Expected " + wrapper_begin + expected + wrapper_end + " (" + typeof expected + "), got " + wrapper_begin + actual + wrapper_end + " (" + typeof actual + ") instead.";
		Test.prototype.stylize(out, {
			"background": "#ef9a9a"
		});
	}

	out.insertAdjacentHTML("beforeend", log);


	passed = null;
	wrapper_begin = null;
	wrapper_end = null;

	if(Test.prototype.output === null) {
		return log;
	} else {
		return out;
	}
};

/**
 * Displays the test result to the desired location
 * @param  {String}  message  A description of the unit test
 * @param  {Object}  expected The expected result of the unit test
 * @param  {Object}  actual   The actual result of the test
 * @param  {String}  type     The type of test to perform; use the Test.prototype.type constants
 */
Test.prototype.showTestResult = function(message, expected, actual, type) {
	var out = Test.prototype.createResult.apply(this, arguments);

	if(Test.prototype.output !== null) {
		Test.prototype.output.appendChild(out);
	} else {
		console.log(out);
	}

	out = null;
};

/**
 * Stylize an element with the specified style object
 * @param  {Object} element The element to stylize
 * @param  {Object} styles  An object containing styles for the element
 */
Test.prototype.stylize = function(element, styles) {
	Object.keys(styles).forEach(function(style) {
		element.style[style] = styles[style];
	});
};

/**
 * Constants for use in showTestResult
 * Describes the type of test to perform
 * @type {Object}
 */
Test.prototype.type = {
	typeIs: "is",
	typeContains: "contains"
};