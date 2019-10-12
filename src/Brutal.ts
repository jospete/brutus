import { isFunction } from 'lodash';

/**
 * Callback type for reporting new combination states
 */
export type BrutalAction<T> = (value: T) => void;

/**
 * Interface for the state used by barrage()
 */
export interface BrutalState<T> {
    readonly input: T[];
    readonly inputSize: number;
    output: T[];
    outputSize: number;
    stopped: boolean;
}


/**
 * AKA Brutus-Util
 */
export namespace Brutal {

    // Base sets
    export const numerics = '0123456789';
    export const specials = ' \'"!@#$%^&*()_+-={}[]`~,.?;:<>';
    export const alphaLower = 'abcdefghijklmnopqrstuvwxyz';
    export const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Composite values
    export const alphaNumericSet = alphaLower + alphaUpper + numerics;
    export const characterSet = alphaLower + alphaUpper + numerics + specials;
    export const characterCount = characterSet.length;

    /**
     * Recursively loop over all indicies until either all combinations have 
     * been found, or 'stopped' becomes true.
     * 
     * For Example,
     * Given the numeric set [0,1,2,3,4,5,6,7,8,9], an output size of 4, and an offset of 0,
     * this will produce all values between 0000-9999
     */
    export function barrage<T, V extends BrutalState<T>>(ctx: V, offset: number, cb: BrutalAction<V>): void {

        if (!ctx || offset < 0 || !isFunction(cb)) {
            console.warn('barrage() will not execute (invalid arguments)');
            return;
        }

        barrageInternal(ctx, offset, cb);
    }

    /**
     * For each offset position between 0 and the output size, 
     * loop through all input elements and place the element at the cursor on the given offset.
     * This process continues until the offset meets the target output size.
     * 
     * Produced elements of [A,B,C] with size 2 would be:
     * 
     * ["A","A"]
     * ["A","B"]
     * ["A","C"]
     * ["B","A"]
     * ["B","B"]
     * ["B","C"]
     * ["C","A"]
     * ["C","B"]
     * ["C","C"]
     */
    function barrageInternal<T, V extends BrutalState<T>>(ctx: V, offset: number, cb: BrutalAction<V>): void {

        if (ctx.stopped) {
            return;
        }

        if (offset >= ctx.outputSize) {
            cb(ctx);
            return;
        }

        for (let i = 0; !ctx.stopped && i < ctx.inputSize; i++) {
            ctx.output[offset] = ctx.input[i];
            barrageInternal(ctx, offset + 1, cb);
        }
    }
}