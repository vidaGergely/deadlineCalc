"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeadlineCalculator {
    constructor() {
        this.workStart = 9;
        this.workEnd = 17;
    }
    calculateDeadline(submitDate, turnaorund) {
        return submitDate;
    }
    isWorkingDateTime(currentDate) {
        return currentDate.getDay() >= 1 && currentDate.getDay() < 5 && currentDate.getHours() >= this.workStart && currentDate.getHours() <= this.workEnd;
    }
}
exports.default = DeadlineCalculator;
