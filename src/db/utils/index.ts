import { DbExercise, DbWorkout } from "@/types/db";

export const parseWorkout = (workout: DbWorkout): Workout => {
    return {
        id: workout.id,
        createdAt: new Date(workout.created_at),
        finishedAt: workout.finished_at ? new Date(workout.finished_at) : null,
    }
}

export const parseExercise = (exercise: DbExercise): Exercise => {
    return {
        id: exercise.id,
        workoutId: exercise.workout_id,
        name: exercise.name
    }
}