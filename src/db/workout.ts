import { DbWorkout } from "@/types/db"
import { getDB } from "."
import { parseWorkout } from "./utils"


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
        return null
    }
}

export const getCurrentWorkout = async (): Promise<Workout | null> => {
    try {
        const db = await getDB()
        const workout = await db.getFirstAsync<DbWorkout>(`
            SELECT * FROM workouts
            WHERE finished_at IS NULL
            ORDER BY created_at DESC
            LIMIT 1
            `)
        if (!workout) return null
        
        return parseWorkout(workout)
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getLocalWorkouts = async (): Promise<Workout[] | null> => {
    try {
        const db = await getDB()
        const workouts = await db.getAllAsync<DbWorkout>(`
            SELECT * FROM workouts
            WHERE finished_at IS NOT NULL
            ORDER BY created_at DESC
            LIMIT 10
            `)
        if (!workouts) return []
        return workouts.map(parseWorkout)
    } catch (error) {
        console.error(error)
        return []
    }
}


        