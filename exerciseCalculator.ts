interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHrs: number[], target: number): Result => {
  const periodLength = dailyHrs.length
  const trainingDays = dailyHrs.filter(h => h > 0).length
  const success = periodLength === trainingDays

  const totalHrs = dailyHrs.reduce((acc, elem) => acc + elem, 0)
  const completionRate = (totalHrs / (target * periodLength))

  let rating, ratingDescription
  if (completionRate < 0.5) {
    rating = 1
    ratingDescription = 'you need to work harder'
  } else if (completionRate < 1) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'perfect, keep it up'
  }

  const average = totalHrs / periodLength

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
