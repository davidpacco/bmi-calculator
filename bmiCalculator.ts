import { isNotNumber } from "./helper";

interface BmiParams {
  height: number,
  weight: number
}

const parseBmiArgs = (args: string[]): BmiParams => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values were not numbers');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 17) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  if (bmi < 35) return 'Obese (Class I)';
  if (bmi < 40) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

try {
  if (require.main === module) {
    const { height, weight } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
  }
} catch (error) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}



