/***********************************************

  "inject.js"

  Created by Michael Cheng on 07/16/2016 19:34
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals require, module*/

const fs = require('fs');
const vm = require('vm');

/**
 * This inject() is STRICTLY for use with including files to test!!
 */
module.exports = (context, relPath) => {
	const P = `${context}/${relPath}`;
	vm.runInThisContext(fs.readFileSync(P, 'utf8'), P);
};