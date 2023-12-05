import express from 'express';
import { Request, Response } from 'express';
import DeadlineCalculator from './deadlineCalculator';

const app = express();
const port = 8000;

app.use(express.json());



app.post('/calculate-deadline', (request: Request, response: Response) => {
  try {
    const { submitDate, turnaround } = request.body;

    if (!submitDate || !turnaround) {
      throw new Error('Invalid request. Please provide submitDate and turnaround.');
    }

    if (!DeadlineCalculator.isDateValid(submitDate)) {
      throw new Error('Date time format is not correct.');
    }

    const deadlineCalculator = new DeadlineCalculator();

    const result: Date = deadlineCalculator.calculateDeadline(submitDate, turnaround);
    response.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred.';
    response.status(400).json({
      'error': errorMessage
    })
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});