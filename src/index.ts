import { MovingAverageWithRate } from "./MovingAverageWithRate"

export default MovingAverageWithRate


declare global {
    interface Window {
        MovingAverageWithRate?: typeof MovingAverageWithRate
    }
}

if (window) {
    window.MovingAverageWithRate = MovingAverageWithRate
}
