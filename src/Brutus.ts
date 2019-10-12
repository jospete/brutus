import { toString, toInteger } from 'lodash';
import { argv } from 'yargs';

import { BrutalContext } from './BrutalContext';
import { Brutal } from './Brutal';

console.log('**** Brutus Brute-Force ****');

const inputTarget = toString(argv.target);
const headStart = toInteger(argv.headStart);

const charSet = argv.numeric ? Brutal.numerics : Brutal.characterSet;
const ctx = BrutalContext.fromCharacterSet(charSet, inputTarget.length);

ctx.output = inputTarget.substr(0, headStart).split('');
console.log('head start: ' + JSON.stringify(ctx.output));

ctx.test = chars => {
    let str = chars.join('');
    process.stdout.write('test string: "' + str + '"\r');
    return str === inputTarget;
};

ctx.start();
ctx.execute(ctx.output.length);
ctx.finish();

console.log('RESULTS: ' + ctx.toString());