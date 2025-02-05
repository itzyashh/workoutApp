import * as Crypto from 'expo-crypto';
import { addSetsToExercise, cleanExercise } from './exerciseService';
import { getCurrentWorkout, getLocalWorkouts, saveWorkout } from '@/db/workout';
import { getExercises } from '@/db/exercises';

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

export const getCurrentWorkoutWithExercises = async (): Promise<WorkoutWithExercises | null> => {
  const workout = await getCurrentWorkout()
  if (!workout) return null
  const exercises = await getExercises(workout.id)
  const exercisesWithSets = await Promise.all(exercises?.map(addSetsToExercise) || [])
  return {
    ...workout,
    exercises: exercisesWithSets
  }
}

export const getLocalWorkoutsWithExercises = async (): Promise<WorkoutWithExercises[] | null> => {
  try {
    const workouts = await getLocalWorkouts()
    if (!workouts) return null
    const workoutsWithExercises = await Promise.all(workouts.map(async (workout) => {
      const exercises = await getExercises(workout.id)
      const exercisesWithSets = await Promise.all(exercises?.map(addSetsToExercise) || [])
      return {
        ...workout,
        exercises: exercisesWithSets
      }
    }))
    return workoutsWithExercises
  } catch (error) {
    console.error(error)
    return null
  }
}
