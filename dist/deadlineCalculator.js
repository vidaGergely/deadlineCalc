"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
class DeadlineCalculator {
    calculateDeadline(submitDate, turnaorund) {
        let submittedDate = new Date(submitDate);
        let remaining = parseInt(turnaorund, 10);
        if (remaining < 0) {
            throw new Error('Invalid turnaround time');
        }
        while (remaining > 0) {
            submittedDate.setHours(submittedDate.getHours() + 1);
            if (DeadlineCalculator.isWorkingDateTime(submittedDate)) {
                remaining--;
            }
            if (DeadlineCalculator.isWorkingDateTime(submittedDate) &&
                submittedDate.getHours() === 9 && submittedDate.getMinutes() === 0) {
                remaining++;
            }
        }
        //timzeone correction 
        submittedDate.setHours(submittedDate.getHours() + 1);
        return submittedDate;
    }
    static isWorkingDateTime(currentDate) {
        const currentDateTime = new Date(currentDate);
        const weekday = currentDateTime.getDay();
        const hour = currentDateTime.getHours();
        return weekday >= 1 &&
            weekday <= 5 &&
            hour >= app_1.workStart &&
            hour <= app_1.workEnd;
    }
    static isDateValid(dateString) {
        const dateTime = new Date(dateString);
        return !isNaN(dateTime.getTime());
    }
}
exports.default = DeadlineCalculator;
