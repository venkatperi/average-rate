import { MovingAverageWithRate } from "./MovingAverageWithRate"

export { MovingAverageWithRate }

declare global {
    interface Window {
        MovingAverageWithRate?: typeof MovingAverageWithRate
    }
}

if (window) {
    window.MovingAverageWithRate = MovingAverageWithRate
}
