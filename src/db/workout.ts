import { getDB } from "."


export const saveWorkout = async (workout: Workout) => {
    try {
        const db = await getDB()  
        const createdAt = typeof workout.createdAt === 'string' ? workout.createdAt : workout.createdAt.toISOString()
        const finishedAt = typeof workout.finishedAt === 'string' ? workout.finishedAt : workout.finishedAt?.toISOString()
        db.runAsync('INSERT OR REPLACE INTO workouts (id, created_at, finished_at) VALUES (?, ?, ?)',
            workout.id,
            createdAt,
            finishedAt ?? null
        )
    } catch (error) {
        console.error(error)
    }
}