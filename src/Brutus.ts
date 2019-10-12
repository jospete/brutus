import { argv } from 'yargs';
import { toString } from 'lodash';
import { Brutal } from './Brutal';
import { BrutalContext } from './BrutalContext';

console.log('**** Brutus Brute-Force ****');

const inputTarget = toString(argv.target);
const charSet = argv.numeric ? Brutal.numerics : Brutal.characterSet;
const ctx = BrutalContext.fromCharacterSet(charSet, inputTarget.length);

ctx.output = inputTarget.substr(0, (argv.headStart as number || 0)).split('');
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