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

// Interface para um conjunto (série) registrado em um treino específico
export interface SetRecord {
    id: string;
    restIntervalId: string; // ID do restTimeInterval correspondente
    repetitions: number;
    weight: number;
    notes?: string;
}

// Interface para exercício registrado em um treino específico
export interface ExerciseRecord {
    id: string;
    exerciseId: string;
    nome: string;
    sets: SetRecord[];
    notes?: string;
}

// Interface para o registro completo de um treino
export interface WorkoutRecord {
    id: string;
    workoutId: string;
    nome: string;
    date: string; // Data no formato ISO
    startTime?: string;
    endTime?: string;
    exercises: ExerciseRecord[];
    notes?: string;
    rating?: number; // Classificação opcional do treino (1-5 estrelas)
}
