export interface Exercise {
    id: string
    nome: string;
    restTimeIntervals: {
        name: string;
        value: number;
        repetitions: number;
        weight: number;
    }[]
    exerciseDurationInSet?: number;
    enrolacaoDurationInSet?: number;
}

export interface Workout {
    id: string;
    nome: string;
    exercices: Exercise[];
    warmUpDuration?: number;
    stretchDuration?: number;
    defaultExecutionTime?: number;
    defaultEnrolacaoDuration?: number;
}
