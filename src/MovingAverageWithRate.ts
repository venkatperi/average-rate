export type Sample = {
    value: number
    timeStamp: number
}

export type MAROptions = {
    windowSize?: number
    windowDuration?: number
}

export class MovingAverageWithRate {
    accumulator: number = 0

    average: number = 0

    earliestSampleTime?: number

    rate: number = 0

    samples: Array<Sample> = []

    /**
     * Calculates average of samples within this duration in ms.
     * @type {number}
     */
    windowDuration?: number

    /**
     * Number of samples con consider when calculating average
     */
    windowSize?: number

    constructor(opts: MAROptions = {}) {
        Object.assign(this, opts)
        if (!(this.windowSize || this.windowDuration)) {
            throw new Error("At a minimum, window size or duration must be" +
                " specified")
        }
    }

    static get now(): number {
        return performance.now()
    }

    /**
     * Adds a sample
     * @param value sample value defaults to 1
     * @param timeStamp sample timestamp, defaults to now
     * @return {number[]} [average, rate]
     */
    add(value: number = 1,
        timeStamp: number = MovingAverageWithRate.now): number[] {
        this.samples.push({value, timeStamp})

        if (this.windowSize && this.samples.length > this.windowSize) {
            let old = this.samples.shift()
            if (old) {
                this.accumulator -= old.value
            }
        }
        this.accumulator += value
        this.average = this.accumulator / this.samples.length
        let duration = timeStamp - this.samples[0].timeStamp
        if (duration > 0) {
            this.rate = this.accumulator * 1000 / duration
        }
        return [this.average, this.rate]
    }
}



