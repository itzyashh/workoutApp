import * as Crypto from 'expo-crypto';

export const createExercise = (workoutId: string, name: string ) => {
    const newExercise: ExerciseWithSets = {
        id: Crypto.randomUUID(),
        workoutId,
        name,
        sets: []
    }

    return newExercise
}
