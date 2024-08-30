const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2
  if (18.5 <= bmi && bmi <= 24.9) return 'Normal range'
}

console.log(calculateBmi(180, 74))