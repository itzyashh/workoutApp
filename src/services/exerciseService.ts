import { v4 as uuidv4 } from 'uuid';

export const createExercise = (name: string, workoutId: string) => {
    const newExercise: ExerciseWithSets = {
        id: uuidv4(),
        name,
        workoutId,
        sets: []
    }
    return newExercise
    }