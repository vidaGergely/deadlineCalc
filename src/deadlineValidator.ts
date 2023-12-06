import { workStart, workEnd } from './app'
import ValidationException from "./validationException";

class DeadLineValidator {
    public static validate(submitDate: string, turnaround: string): void {
        if (!submitDate || !turnaround) {
            throw new ValidationException('Invalid request. Please provide submitDate and turnaround.');
        }

        if (!this.isDateValid(submitDate) || !Number(turnaround)) {
            throw new ValidationException('Date time format or tornaround is not correct.');
        }
        let submitDateTime: Date = new Date(submitDate);
        if (!this.isWorkingDateTime(submitDateTime)) {
            throw new ValidationException('The working time is 9.00-17.00 M-F');
        }
    }


    public static isWorkingDateTime(currentDateTime: Date): boolean {
        const weekday: number = currentDateTime.getDay();
        const hour: number = currentDateTime.getHours();

        return weekday >= 1 && weekday <= 5 && hour >= workStart && hour < workEnd;
    }

    private static isDateValid(dateString: string): boolean {
        const dateTime = new Date(dateString);
        return !isNaN(dateTime.getTime());
    }
}

export default DeadLineValidator;