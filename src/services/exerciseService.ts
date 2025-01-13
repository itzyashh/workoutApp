import * as Crypto from 'expo-crypto';
import { cleanSets, createSet } from './setService';

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

export const cleanExercise = (exercise: ExerciseWithSets) => {
    const sets = cleanSets(exercise.sets);
  
    if (sets.length === 0) {
      return null;
    }
  
    return {
      ...exercise,
      sets,
    };
  };
