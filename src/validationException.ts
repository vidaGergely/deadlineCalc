import DeadlineCalculator from "./deadlineCalculator";

class ValidationException extends Error {
    constructor(errors: string) {
        super(errors);
        this.name = 'ValidationException';
    }
}

export default ValidationException;
