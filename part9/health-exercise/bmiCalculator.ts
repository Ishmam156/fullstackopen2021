interface BMIValues {
    height: number;
    weight: number;
}

export const parseArguments = (args: Array<string>): BMIValues => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    if (args.length > 4) {
        throw new Error('Too many arguments');
    }

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    // The BMI is defined as the body mass divided by the square of the body height
    const BMI = (weight / (height / 100) ** 2);
    if (BMI < 18.5) {
        return 'Not Normal (under weight)';
    } else if (BMI <= 25) {
        return 'Normal (healthy weight)';
    } else if (BMI <= 30) {
        return 'Not Normal (over weight)';
    } else {
        return 'Not Normal (obese)';
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));

} catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something went wrong, message: ', error.message);
}