"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const validationException_1 = __importDefault(require("./validationException"));
class DeadLineValidator {
    static validate(submitDate, turnaround) {
        if (!submitDate || !turnaround) {
            throw new validationException_1.default('Invalid request. Please provide submitDate and turnaround.');
        }
        if (!this.isDateValid(submitDate) || !Number(turnaround)) {
            throw new validationException_1.default('Date time format or tornaround is not correct.');
        }
        let submitDateTime = new Date(submitDate);
        if (!this.isWorkingDateTime(submitDateTime)) {
            throw new validationException_1.default('The working time is 9.00-17.00 M-F');
        }
    }
    static isWorkingDateTime(currentDateTime) {
        const weekday = currentDateTime.getDay();
        const hour = currentDateTime.getHours();
        const seconds = currentDateTime.getMilliseconds();
        return weekday >= 1 && weekday <= 5 && hour >= app_1.workStart && hour < app_1.workEnd;
    }
    static isDateValid(dateString) {
        const dateTime = new Date(dateString);
        return !isNaN(dateTime.getTime());
    }
}
exports.default = DeadLineValidator;
