"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deadlineValidator_1 = __importDefault(require("./deadlineValidator"));
class DeadlineCalculator {
    calculateDeadline(submitDate, turnaorund) {
        let submittedDate = new Date(submitDate);
        let remaining = parseInt(turnaorund, 10);
        if (remaining < 0) {
            throw new Error('Invalid turnaround time');
        }
        while (remaining > 0) {
            submittedDate.setHours(submittedDate.getHours() + 1);
            if (deadlineValidator_1.default.isWorkingDateTime(submittedDate)) {
                remaining--;
                //turning every day at once in 00:00
                if (submittedDate.getHours() === 0 && submittedDate.getMinutes() === 0) {
                    remaining++;
                }
            }
        }
        //timzeone correction 
        submittedDate.setHours(submittedDate.getHours() + 1);
        return submittedDate;
    }
}
exports.default = DeadlineCalculator;
