import * as Crypto from 'expo-crypto';
import { cleanExercise } from './exerciseService';

export const createWorkout = () => {
    const newWorkout: WorkoutWithExercises = {
        id: Crypto.randomUUID(),
        createdAt: new Date(),
        finishedAt: null,
        exercises: []
    }

    return newWorkout
}

export const finishWorkout = (currentWorkout: WorkoutWithExercises) => {

    const cleanedWorkout = cleanupWorkout(currentWorkout)

    const finishedWorkout: WorkoutWithExercises = {
        ...cleanedWorkout,
        finishedAt: new Date()
    }

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