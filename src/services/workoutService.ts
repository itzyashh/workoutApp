import * as Crypto from 'expo-crypto';

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
    const finishedWorkout: WorkoutWithExercises = {
        ...currentWorkout,
        finishedAt: new Date()
    }

    return finishedWorkout
}
