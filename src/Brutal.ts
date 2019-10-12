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

        if (offset < 0 || !ctx || ctx.stopped) {
            return;
        }

        if (offset >= ctx.outputSize) {
            if (isFunction(cb)) cb(ctx);
            return;
        }

        for (let i = 0; !ctx.stopped && i < ctx.inputSize; i++) {
            ctx.output[offset] = ctx.input[i];
            barrage(ctx, offset + 1, cb);
        }
    }
}