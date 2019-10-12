import { toString } from 'lodash';

import { BrutalState, Brutal } from './Brutal';

/**
 * Simple container for the state/progress/context of a brute-force execution.
 */
export class BrutalContext<T> implements BrutalState<T> {

    public readonly inputSize: number;

    public output: T[];
    public stopped: boolean;
    public test: (values: T[]) => boolean;

    private startTimestampInternal: number;
    private endTimestampInternal: number;
    private iterationsInternal: number;

    constructor(public readonly input: T[], public outputSize: number = 10) {

        this.inputSize = this.input.length;

        this.output = [];
        this.stopped = false;
        this.test = () => false;

        this.startTimestampInternal = 0;
        this.endTimestampInternal = 0;
        this.iterationsInternal = 0;
    }

    public static fromCharacterSet(charSet: string, outputSize?: number): BrutalContext<string> {
        return new BrutalContext(toString(charSet).split(''), outputSize);
    }

    public get elapsed(): number {
        return this.endTimestampInternal - this.startTimestampInternal;
    }

    public get iterations(): number {
        return this.iterationsInternal;
    }

    public finish(): void {
        this.endTimestampInternal = Date.now();
    }

    public start(): void {
        this.startTimestampInternal = Date.now();
        this.iterationsInternal = 0;
    }

    public execute(offset: number = 0): void {
        Brutal.barrage(this, Math.max(offset, 0), ctx => {
            ctx.iterationsInternal++;
            ctx.stopped = ctx.test(ctx.output);
        });
    }

    public toString(): string {
        return 'stopped: ' + this.stopped
            + ', iterations: ' + this.iterations
            + ', elapsed: ' + this.elapsed + ' (ms)';
    }
}