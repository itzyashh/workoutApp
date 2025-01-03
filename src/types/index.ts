type Workout = {
    id: string;
    createdAt: Date;
    finishedAt: Date | null;
}

type Exercise = {
    id: string;
    workoutId: string;
    name: string;
}

type ExerciseSet = {
    id: string;
    exerciseId: string;
    reps: number;
    weight: number;
    oneRepMax: number;
}