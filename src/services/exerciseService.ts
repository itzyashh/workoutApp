import * as Crypto from 'expo-crypto';
import { createSet } from './setService';

export const createExercise = (workoutId: string, name: string ) => {
    const newExercise: ExerciseWithSets = {
        id: Crypto.randomUUID(),
        workoutId,
        name,
        sets: []
    }

    const newSet = createSet(newExercise.id)

    newExercise.sets.push(newSet)

    return newExercise
}
