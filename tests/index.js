/***********************************************

  "index.js"

  Created by Michael Cheng on 07/17/2016 14:27
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require */
const { Test, inject } = require('../test.js');


Test('Test should be a function')
	.expect(typeof Test)
	.toBe('function');

Test('Test should return an object')
	.expect(typeof Test())
	.toBe('object');

Test('Test should contain the inject() function')
	.expect(typeof inject)
	.toBe('function');

Test('Test().expect() and alias .assert() should return a UnitTest object')
	.expect(typeof Test().expect() === typeof Test().assert())
	.toBe(true);

let done;
Test('Test().do() should execute the specified callback')
	.do(() => done = true)
	.expect(done)
	.toBe(true);

Test('Validation function `contains` should specify if the actual result contains the expected result')
	.expect(Test.ValidationFunction.CONTAINS('M', 'Michael'))
	.toBe(true);

Test('Shallow array validation should be correct')
	.using(Test.ValidationFunction.ARRAY_SHALLOW)
	.expect(['a', 'b', 1, 2])
	.equals(['a', 'b', 1, 2]);

Test('Deep object validation should be correct')
	.using(Test.ValidationFunction.OBJECT_DEEP)
	.expect({
		k: ['a', 'b', [1, 2]]
	})
	.equals({
		k: ['a', 'b', [1, 2]]
	});

Test('Failed tests should be colored (use your eyes to verify)')
	.assert(0.1+0.2)
	.toBe(0.3);

let obj = {
	fn: () => {
		console.log('Hello');
	}
};
Test('Observed functions know when they are called')
	.observe(obj, 'fn')
	.do(() => { obj.fn(); })
	.expect(obj.fn)
	.toHaveBeenCalled();

Test('Observed functions are reset')
	.observe(obj, 'fn')
	.expect(obj.fn)
	.notToHaveBeenCalled();