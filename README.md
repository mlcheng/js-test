# js-test

Looking for a no-nonsense testing framework for JavaScript? Look no further! This is a barebones testing framework, but it's fluent and it works.

A demo is available on my [playground](https://www.michaelcheng.us/playground/lib-js/test/).

## Usage
Usage is fairly simple. Let's first setup an `add()` function.

```javascript
const add = (x, y) => x + y;
```

To test this function, first set the description of the test case.

```javascript
Test("1+1 should be 2");
```

After that, you can specify the test to run

```javascript
Test("1+1 should be 2").expect(add(1+1));
```

And then what you expect the result to be

```javascript
Test("1+1 should be 2").expect(add(1+1)).toBe(2);
```

### Alias
`.expect() === .assert()`
`.to() === .toBe() === .toHave()`

## Advanced usage
This test framework has some extras that may be useful.

### Comparators
By default, the `to()` method will use strict comparison (`===`) when comparing the expected and actual result. You can specify what kind of comparator to use in your test using `.using()`.

```javascript
Test("The word 'hello' should contain the letter 'h'")
  .using((expected, actual) => ~actual.indexOf(expected))
  .expect('hello')
  .toHave('h');
```

The comparator function takes the expected value as the first argument and the actual value as the second. Thus, `actual` is 'hello', and `expected` is the character 'h'.

There are two built-in comparators in this testing framework, including the contains comparator above. You can use them by declaring

```javascript
Test()
  .using(Test.ValidationFunction.CONTAINS || Test.ValidationFunction.EQUALS)
  //...
```

### Actions
Before executing a test, it is possible to perform some action first. This can be used to setup some background on the scenario.

```javascript
let data;
const updateData = () => new Promise((resolve) => {
  data = 'hello';
  resolve();
});

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

### Result output
By default, the test result will be output to the console. If you desire, you can specify the output location of the tests

```javascript
Test.config.output(document.body);
```

And the results will be styled and beautiful to look at.

## Real-world usage
When you want to test your code, require `inject.js` and `test.js` in your file. `inject()` will allow you to inject any file into the test scenario and run it in the same context. The syntax of `inject()` is as follows:

```javascript
inject(context, relativePath);
```

Where context is usually the NodeJS global `__dirname`. A sample test file would look something like this:

```javascript
'use strict';

const inject = require('path/to/inject.js');
const Test = require('path/to/test.js');
inject(__dirname, 'relative/path/to/file/to/test.js');

// Begin tests
Test(...)
```