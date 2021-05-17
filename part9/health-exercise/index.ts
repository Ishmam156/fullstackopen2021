import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator';
import { exerciseValues, calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const initHeight = String(req.query.height);
    const initWeight = String(req.query.weight);

    try {
        const { height, weight } = parseArguments(['', '', initHeight, initWeight]);
        const bmi = calculateBmi(height, weight);
        res.json({
            weight,
            height,
            bmi
        });
    } catch (error) {
        res.json({
            error: "malformatted parameters"
        });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const args: any = req.body; // eslint-disable-line @typescript-eslint/no-explicit-any

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!args.target || !args.daily_exercises) {
        res.json({
            error: "parameters missing"
          });
    }
    const transformArguments = (daily_exercises: Array<number>, target: number): exerciseValues => {
    
        if (!isNaN(target) && daily_exercises.filter(val => isNaN(val)).length === 0) {
            return {
                days: daily_exercises,
                target
            };
        } else {
            throw new Error('malformatted parameters');
        }
    };

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const { days, target } = transformArguments(args.daily_exercises, args.target);
        const exerciseResult = calculateExercises(days, target);
        res.json(exerciseResult);
    } catch (error) {
        res.json({
            error: "malformatted parameters"
          });
    }
});

const PORT = 3005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});