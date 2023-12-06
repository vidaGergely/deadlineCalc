import DeadLineValidator from './deadlineValidator';

class DeadlineCalculator {

    public calculateDeadline(submitDate: string, turnaorund: string): Date {

        let submittedDate: Date = new Date(submitDate);
        let remaining: number = parseInt(turnaorund, 10);

        if (remaining < 0) {
            throw new Error('Invalid turnaround time');
        }

        while (remaining > 0) {
            submittedDate.setHours(submittedDate.getHours() + 1)
            if (DeadLineValidator.isWorkingDateTime(submittedDate)) {
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
export default DeadlineCalculator;
