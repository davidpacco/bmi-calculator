import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const queryParams = req.query;

  if (isNaN(Number(queryParams.height)) || isNaN(Number(queryParams.weight))) {
    return res.json({ error: 'malformatted parameters' });
  }

  const height = Number(queryParams.height);
  const weight = Number(queryParams.weight);
  const bmi = calculateBmi(height, weight);

  return res.json({
    height,
    weight,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (!target || isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.json({error: 'malformatted parameters'});
  }

  for (const i of daily_exercises) {
    if (isNaN(Number(i))) {
      return res.json({error: 'malformatted parameters'});
    }
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));