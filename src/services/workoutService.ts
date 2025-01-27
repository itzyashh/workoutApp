import * as Crypto from 'expo-crypto';
import { cleanExercise } from './exerciseService';
import { saveWorkout } from '@/db/workout';

export const createWorkout = () => {
    const newWorkout: WorkoutWithExercises = {
        id: Crypto.randomUUID(),
        createdAt: new Date(),
        finishedAt: null,
        exercises: []
    }
    saveWorkout(newWorkout)
    return newWorkout
}

export const finishWorkout = (currentWorkout: WorkoutWithExercises) => {

    const cleanedWorkout = cleanupWorkout(currentWorkout)

    const finishedWorkout: WorkoutWithExercises = {
        ...cleanedWorkout,
        finishedAt: new Date()
    }
    saveWorkout(finishedWorkout)
    return finishedWorkout
}

export const cleanupWorkout = (workout: WorkoutWithExercises) => {
    const cleanedExercises = workout.exercises
      .map(cleanExercise)
      .filter((e) => !!e);
  
    return {
      ...workout,
      exercises: cleanedExercises,
    };
  };