class DeadlineCalculator {

    private workStart: number = 9;
    private workEnd: number = 17;

    public calculateDeadline(submitDate: Date, turnaorund: string): Date {

        let submittedDate: Date = new Date(submitDate);
        let remaining: number = parseInt(turnaorund, 10);

        if ( remaining < 0) {
            throw new Error('Invalid turnaround time');
        }

        while (remaining > 0) {
            submittedDate.setHours(submittedDate.getHours() + 1)
            if (this.isWorkingDateTime(submittedDate)) {
                remaining--;
            }

            if (submittedDate.getHours() === 9 && submittedDate.getMinutes() === 0) {
                remaining++;
            }
        }

        return submittedDate;
    }

    public isWorkingDateTime(currentDate: Date): boolean {
        const currentDateTime: Date = new Date(currentDate);
        const weekday: number = currentDateTime.getDay();
        const hour: number = currentDateTime.getHours();

        return weekday >= 1 &&
            weekday <= 5 &&
            hour >= this.workStart &&
            hour <= this.workEnd;
    }

    public static isDateValid(dateString: string): boolean {
        const dateTime = new Date(dateString);
        return !isNaN(dateTime.getTime());
    }
}
export default DeadlineCalculator;
