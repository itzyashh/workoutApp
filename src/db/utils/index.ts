import { DbExercise, DbExerciseSet, DbWorkout } from "@/types/db";

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

export const parseSet = (set: DbExerciseSet): ExerciseSet => {
    return {
        id: set.id,
        exerciseId: set.exercise_id,
        reps: set.reps ?? undefined,
        weight: set.weight || null,
        oneRM: set.one_rm || undefined
    }
}