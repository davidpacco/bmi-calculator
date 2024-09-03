import { isNotNumber } from "./helper";

interface Params {
  target: number
  dailyHrs: number[],
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseArgs = (args: string[]): Params => {
  if (args.length < 5) throw new Error('Not enough arguments');

  const values = [];
  for (const value of args.slice(2)) {
    if (isNotNumber(value)) {
      throw new Error('Provided values were not numbers');
    }
    values.push(Number(value));
  }

  return {
    target: values[0],
    dailyHrs: values.slice(1)
  };
};

const calculateExercises = (dailyHrs: number[], target: number): Result => {
  const periodLength = dailyHrs.length;
  const trainingDays = dailyHrs.filter(h => h > 0).length;
  const success = periodLength === trainingDays;

  const totalHrs = dailyHrs.reduce((acc, elem) => acc + elem, 0);
  const completionRate = (totalHrs / (target * periodLength));

  let rating, ratingDescription;
  if (completionRate < 0.5) {
    rating = 1;
    ratingDescription = 'you need to work harder';
  } else if (completionRate < 1) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'perfect, keep it up';
  }

  const average = totalHrs / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { dailyHrs, target } = parseArgs(process.argv);
  console.log(calculateExercises(dailyHrs, target));
} catch (error) {
  let errorMessage = 'Something went wrong';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}