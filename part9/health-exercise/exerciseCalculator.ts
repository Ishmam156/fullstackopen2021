interface exerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface exerciseValues {
    days: Array<number>,
    target: number
}

const transformArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 4) {
        throw new Error('parameters missing');
    }

    const argsTarget = Number(args[2]);
    const argsDays = args.slice(3, args.length).map(val => Number(val));

    if (!isNaN(argsTarget) && argsDays.filter(val => isNaN(val)).length === 0) {
        return {
            days: argsDays,
            target: argsTarget
        };
    } else {
        throw new Error('malformatted parameters');
    }
};

export const calculateExercises = (days: Array<number>, target: number): exerciseResult => {
    const periodLength = days.length;
    const trainingDays = days.filter(day => day !== 0).length;
    const totalHours = days.reduce((a, b) => a + b, 0);
    const average = totalHours / periodLength;
    const success = average >= target ? true : false;

    let rating = 0;
    if (average >= target) {
        rating = 3;
    } else if (average >= target / 2) {
        rating = 2;
    } else {
        rating = 1;
    }

    let ratingDescription = '';
    if (rating == 3) {
        ratingDescription = "Excellent! You've met your hours!";
    } else if (rating == 2) {
        ratingDescription = "Not too bad but could be better.";
    } else {
        ratingDescription = "Needs improvement - keep at it.";
    }

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
    const { days, target } = transformArguments(process.argv);
    console.log(calculateExercises(days, target));
} catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Something went wrong: ', error.message);
}