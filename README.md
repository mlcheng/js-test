# js-test

Looking for a no-nonsense testing framework for JavaScript? Look no further! This is a barebones testing framework, but it's fluent and it works.

A demo is available on my [playground](https://www.michaelcheng.us/playground/lib-js/test/).

## Usage
Usage is fairly simple. Let's first setup an `add()` function.

```javascript
const add = (...nums) => nums.reduce((total, n) => total + n);
```

To test this function, first set the description of the test case.

```javascript
Test("1+1 should be 2");
```

After that, you can specify the test to run

```javascript
Test("1+1 should be 2")
	.expect(add(1, 1));
```

And then what you expect the result to be

```javascript
Test("1+1 should be 2")
	.expect(add(1, 1))
	.toBe(2);
```

### Alias
`.expect() === .assert()`
`.to() === .toBe() === .toHave() === .is()`

## Advanced usage
This test framework also has some extras that may be useful.

### Comparators
By default, the `to()` method will use strict comparison (`===`) when comparing the expected and actual result. You can specify what kind of comparator to use in your test using `.using()`.

```javascript
Test("The word 'hello' should contain the letter 'h'")
	.using((expected, actual) => ~actual.indexOf(expected))
	.expect('hello')
	.toHave('h');
```

The comparator function takes the expected value as the first argument and the actual value as the second. Thus, `actual` is 'hello', and `expected` is the character 'h'.

There are three built-in comparators in this testing framework, including the contains comparator above. You can use them by declaring

```javascript
Test()
	.using(
		Test.ValidationFunction.EQUALS ||
		Test.ValidationFunction.NOT_EQUALS ||
		Test.ValidationFunction.CONTAINS
	)
	//...
```

### Actions
Before executing a test, it is possible to perform some action first. This can be used to setup some background on the scenario.

```javascript
let data;
const updateData = () => {
	data = 'hello';
};

Test("Get data from service")
	.do(updateData)
	.expect(data)
	.toBe('hello');
```

Note that you can `.expect()` a Promise to have a result too.

```javascript
const fetchName = Promise.resolve('Michael');

Test("Get name from Promise")
	.expect(fetchName)
	.toBe('Michael');
```

### Test config
You have a few options to configure the test.

#### Output location
By default, the test result will be output to the console. If you desire, you can specify the output location of the tests

```javascript
Test.config.output(document.body);
```

And the results will be styled and beautiful to look at.

#### Hide passing tests
By default, all test results regardless of whether they pass or not will be shown. To hide tests that pass, simply

```javascript
Test.config.hidePassed(true);
```

#### Console color
If using the framework in a NodeJS environment, it will automatically colorize the output. If you wish to change the coloring method (you shouldn't), you can set it by

```javascript
Test.config.colorMethod(
	Test.Console.CONSOLE ||
	Test.Console.TERMINAL
);
```

## Real-world usage
When you want to test your code, require `test.js` in your file. An exported `inject()` function will allow you to inject any file into the test scenario and run it in the context of your test. The syntax of `inject()` is as follows:

```javascript
inject(context, relativePath);
```

Where context is usually the NodeJS global `__dirname`. A sample test file would look something like this:

```javascript
'use strict';

const { Test, inject } = require('path/to/test.js');
inject(__dirname, 'relative/path/to/file/to/test.js');

// Begin tests
Test(...)
```
