/**
 * Callback used to report new combinations for a target state
 */
export type BrutalAction<T> = (value: T) => void;

/**
 * Interface for the state used by combo()
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
export module Brutal {

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
     * been found, or 'targedFound' becomes true.
     * 
     * Given the numeric set 0,1,2,3,4,5,6,7,8,9 and an output size of 4,
     * this will produce all values between 0000-9999
     */
    export function barrage<T, V extends BrutalState<T>>(ctx: V, offset: number, cb: BrutalAction<V>): void {

        if (ctx.stopped) {
            return;
        }

        if (offset >= ctx.outputSize) {
            cb(ctx);
            return;
        }

        for (let i = 0; !ctx.stopped && i < ctx.inputSize; i++) {
            ctx.output[offset] = ctx.input[i];
            barrage(ctx, offset + 1, cb);
        }
    }
}