"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workEnd = exports.workStart = void 0;
const express_1 = __importDefault(require("express"));
const deadlineCalculator_1 = __importDefault(require("./deadlineCalculator"));
const deadlineValidator_1 = __importDefault(require("./deadlineValidator"));
const validationException_1 = __importDefault(require("./validationException"));
const app = (0, express_1.default)();
const port = 8000;
exports.workStart = 9;
exports.workEnd = 17;
app.use(express_1.default.json());
app.post('/calculate-deadline', (request, response) => {
    try {
        const { submitDate, turnaround } = request.body;
        deadlineValidator_1.default.validate(submitDate, turnaround);
        const deadlineCalculator = new deadlineCalculator_1.default();
        const result = deadlineCalculator.calculateDeadline(submitDate, turnaround);
        response.json({ 'result': result });
    }
    catch (error) {
        const errorMessage = error instanceof validationException_1.default ? error.message : 'An error occurred.';
        response.status(400).json({
            'error': errorMessage
        });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
