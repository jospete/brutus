import { toString, toInteger } from 'lodash';
import { argv } from 'yargs';

import { BrutalContext } from './BrutalContext';

console.log('**** Brutus Combinations ****');

const charSet = toString(argv.charSet);
const outputSize = Math.max(toInteger(argv.outputSize), 1);
const ctx = BrutalContext.fromCharacterSet(charSet, outputSize);

ctx.test = chars => {
    console.log(JSON.stringify(chars));
    return false;
};

ctx.start();
ctx.execute();
ctx.finish();