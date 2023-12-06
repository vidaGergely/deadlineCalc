import express from 'express';
import { Request, Response } from 'express';
import DeadlineCalculator from './deadlineCalculator';
import DeadLineValidator from './deadlineValidator';
import ValidationException from './validationException';

const app = express();
const port = 8000;

export const workStart: number = 9;
export const workEnd: number = 17;

app.use(express.json());


app.post('/calculate-deadline', (request: Request, response: Response) => {
  try {
    const { submitDate, turnaround } = request.body;
    DeadLineValidator.validate(submitDate, turnaround);

    const deadlineCalculator = new DeadlineCalculator();
    const result: Date = deadlineCalculator.calculateDeadline(submitDate, turnaround);

    response.json({ 'result': result });
  }
  catch (error) {
    const errorMessage = error instanceof ValidationException ? error.message : 'An error occurred.';
    response.status(400).json({
      'error': errorMessage
    })
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});