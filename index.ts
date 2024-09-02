import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const queryParams = req.query

  if (isNaN(Number(queryParams.height)) || isNaN(Number(queryParams.weight))) {
    return res.json({ error: 'malformatted parameters' })
  }

  const height = Number(queryParams.height)
  const weight = Number(queryParams.weight)
  const bmi = calculateBmi(height, weight)

  return res.json({
    height,
    weight,
    bmi
  })
})

const PORT = 3003

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))