import { v4 as uuidv4 } from 'uuid';

export const newWorkout = () => {
    const newWorkout: WorkoutWithExercises = {
        id: uuidv4(),
        createdAt: new Date(),
        finishedAt: null,
        exercises: []
    }
    return newWorkout
}

export const finishWorkout = (workout: WorkoutWithExercises) => {
    workout.finishedAt = new Date()
    return workout
}