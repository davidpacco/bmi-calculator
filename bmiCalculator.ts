const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2
  console.log(bmi)
  if (18.5 <= bmi && bmi <= 24.9) return 'Normal range'
}

console.log(calculateBmi(180, 74))
