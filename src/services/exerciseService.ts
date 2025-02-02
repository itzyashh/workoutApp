import * as Crypto from 'expo-crypto';
import { cleanSets, createSet } from './setService';
import { deleteExercise, saveExercise } from '@/db/exercises';

export const createExercise = (workoutId: string, name: string ) => {
  console.log('createExercise')
    const newExercise: ExerciseWithSets = {
        id: Crypto.randomUUID(),
        workoutId,
        name,
        sets: []
    }
    saveExercise(newExercise)
    const newSet = createSet(newExercise.id)

    newExercise.sets.push(newSet)

    return newExercise
}

export const cleanExercise = (exercise: ExerciseWithSets) => {
    const sets = cleanSets(exercise.sets);
  
    if (sets.length === 0) {
      deleteExercise(exercise.id);
      return null;
    }
  
    return {
      ...exercise,
      sets,
    };
  };
